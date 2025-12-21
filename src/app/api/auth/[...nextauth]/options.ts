import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import GoogleProvider from "next-auth/providers/google"; // 1. Import GoogleProvider
import Credentials from "next-auth/providers/credentials";
import mongoose, { ObjectId } from "mongoose";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // The '!' asserts that these are non-null
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // You can specify more than one credentials provider by specifying a unique id for each one.
      //    else id is optional here
      id: "credentials",

      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // for the html form for login
        identifier: {
          label: "Email/Username",
          type: "text",
          placeholder: "Email/Username",
        },
        password: { label: "Password", type: "password" },
      }, // how to authorise  define using this authorise method
      async authorize(credentials: any): Promise<any> {
        // to access do as -> credentials.identifier.email, credentials.identifier.username, etc
        // Any object returned will be saved in `user` property of the JWT
        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject(throw error) this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        await connectDB();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          }).select("+password");
          if (!user) throw new Error("Username/Email or Password is wrong !!");
          if (!user.isVerified)
            throw new Error("Please Verify your Account first");
          if (!user.password) {
            throw new Error("Please sign in using Google");
          }
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch)
            throw new Error("Username/Email or Password is wrong !!");
          return user;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // runs after signIn logics compleeion
      if (account?.provider === "credentials") {
        return true;
      }
      // This callback is triggered when a user signs in, either with credentials or OAuth
      if (account?.provider === "google") {
        // console.log("\n\n user", user);
        await connectDB();
        try {
          const existingUser = await UserModel.findOne({ email: user.email });
          // console.log("\nexistin guser foundexistingUser", existingUser, "\n");

          if (!existingUser) {
            // If the user doesn't exist, create a new user

            const username = user.email!.split("@")[0]; // Basic username from email
            const newUser = new UserModel({
              username: `${username}_${Date.now()}`, // Append timestamp for uniqueness
              email: user.email,
              isVerified: true, // Google users are considered verified
              messages: [],
            });
            const savedUser = await newUser.save();
            user._id = savedUser._id.toString();
            // console.log("\nsaved guser foundexistingUser", savedUser, "\n");
          } else {
            user._id = existingUser._id.toString();
          }
          return true; // Allow the sign-in
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false; // Prevent sign-in on error
        }
      }
      // fix sign-in for  credentials
      return true;
    },

    // user-> what we returned the user from the async cred. authorize functn.
    async jwt({ token, user }) {
      if (user) {
        await connectDB();

        const dbUser = await UserModel.findOne({
          _id: user._id,
        });

        if (dbUser) {
          token._id = dbUser._id.toString();
          token.username = dbUser.username;
          token.isVerified = dbUser.isVerified;
          token.isAcceptingMessages = dbUser.isAcceptingMessages;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        _id: token._id,
        isVerified: token.isVerified,
        isAcceptingMessages: token.isAcceptingMessages,
        username: token.username,
      };
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
