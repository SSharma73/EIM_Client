import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Next Auth",
      credentials: {},
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", username: credentials?.email };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
