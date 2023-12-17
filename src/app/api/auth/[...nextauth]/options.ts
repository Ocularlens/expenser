import findUser from "@/lib/actions/findUser";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        const user = await findUser(credentials?.username as string);

        if (!user) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ user, token }: any) {
      const User: any = user;

      if (user) {
        token.id = User.id;
        token.fullname = User.fullname;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.fullname = token.fullname;

      return session;
    },
  },
};
