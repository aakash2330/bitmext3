import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,

      profile(profile, token) {
        console.log("token:", token);
        return {
          id: profile.sub,
          name: `${profile.given_name}`,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log("account", account);
      console.log("profile", profile);
      return true;
    },
    session: ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      // console.log('url', url);
      // console.log('baseUrl', baseUrl);
      // Allows relative callback URLs
      //if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      //else if (new URL(url).origin === baseUrl) return url;
      return "/graph";
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
