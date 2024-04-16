import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Your Email",
          type: "email",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const { email, password } = credentials;

        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "auth/login",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status == 401) {
          console.log("unauthorized access");

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      //   if (new Date().getTime() < token.backendTokens.expiresIn)
      //     return token;

      //   return await refreshToken(token);
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
