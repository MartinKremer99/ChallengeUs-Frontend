import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const baseURL = process.env.API_URL;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        const result = await fetch(baseURL + "/user/login", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: new Headers({
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }),
          withCredentials: true,
          credentials: "same-origin",
        });
        const data = await result.json();
        if (data?.msg) {
          return null;
        } else {
          return data.user;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.isAdmin = token.isAdmin;
        session.id = token.id;
      }
      return session;
    },
  },
  jwt: {
    encryption: true,
  },
  pages: {
    signIn: "/login",
  },
});
