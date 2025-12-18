// Providers ->
//     Used to define login methods
//     3 main types:
//         1) OAuth (Google, GitHub, Facebook, etc.)
//         2) Credentials (username + password)
//         3) Email Magic Link

// Providers list ->
//     OAuth Providers:
//         Google, GitHub, Facebook, Twitter, Discord, etc
//         Require ONLY: clientId + clientSecret
//
//     Credentials Provider:
//         Custom email/pass login
//         You control the entire verify logic
//         Needs authorize() function (manual authentication)
//
//     Email Provider:
//         OTP/Magic link login
//         Requires an email server (SMTP)

// Config in NextAuthOptions ->
//     pages ->
//         Fully customizable pages:
//             signIn     -> custom login page
//             signOut    -> logout page
//             error      -> error messages
//             newUser    -> signup page
//             verifyRequest -> email verification page
//         Controls "which activity happens on which route"
//
//     callbacks ->
//         signin      -> custom validation logic
//         redirect    -> where to redirect after login
//         session     -> modify what goes inside session (important)
//         jwt         -> modify JWT data (important)
//
//     Why callbacks matter?
//         Built-in providers only give limited fields (like name/email)
//         But our DB may have more fields (id, role, username, status)
//         callbacks let us ADD those fields inside JWT/session

// Structuring ->
//     Best practice: create a separate "options.ts"
//     and import it inside [...nextauth]/route.ts
//
//     Reason: Separation of Concerns (SoC)
//     Cleaner code, better readability
//     But technically you can put everything in route.ts as well

// Built-in vs Custom Login UI ->
//     If you do NOT define "pages.signIn":
//         NextAuth shows its default UI automatically
//
//     If you DEFINE "pages.signIn":
//         NextAuth will NOT show built-in UI
//         It will open YOUR custom page instead (Tailwind/GSAP/etc)
//         You get full control of design
//
//     Calling signIn("credentials") still works
//     but it redirects to your custom page instead of default

import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

// get and post are fixed verbs used in this NextAuth Frameworks
export { handler as GET, handler as POST };
