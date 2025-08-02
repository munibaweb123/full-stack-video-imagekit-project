import { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const authOptions:NextAuthOptions = {
    providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", },
                password: { label: "Password", type: "password", },
            },
            async authorize(credentials, req: any) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }
                try{
                    await dbConnect();
                    const user=await User.findOne({ email: credentials.email })

                    if (!user) {
                        throw new Error("No user found with the given email");
                    }
                    const isValid =await bcrypt.compare(credentials.password, user.password)
                    if (!isValid) {
                        throw new Error("Invalid password");
                    }
                    return { id: user._id.toString(), email: user.email };

                }
                catch (error) {
                    console.error("Authorization error:", error);
                    throw error;
                }
            }
        }),
    // ...add more providers here
  ],

  callbacks:{
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id; // Add user ID to the token
        }
        return token;
    },
    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string; // Add user ID to the session
        }
        return session;
    }
  },
  pages:{
    signIn: "/login",
    error: "/logon"
  },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}