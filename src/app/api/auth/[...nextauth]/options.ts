import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
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
          const passwordMatch = bcrypt.compare(
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
    // user-> what we returned the user from the async cred. authorize functn.
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
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
