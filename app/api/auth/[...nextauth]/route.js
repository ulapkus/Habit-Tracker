import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import Connect from "../../../../utils/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../utils/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text", placeholder: "Aaron" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Find your user in the database using MongoDBAdapter
        const user = await authOptions.adapter.getUserByEmail(
          credentials.email
        );
        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            console.log("hi");
            return user;
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Set it as jwt instead of database
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import { Account, User as AuthUser } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import User from "../../../../models/User";
// import Connect from "../../../../utils/db";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "../../../../utils/mongodb";

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await Connect();
//         try {
//           const user = await User.findOne({ email: credentials.email });
// if (user) {
//   const isPasswordCorrect = await bcrypt.compare(
//     credentials.password,
//     user.password
//   );
//   if (isPasswordCorrect) {
//     return user;
//   }
// }
//         } catch (err) {
//           throw new Error(err);
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//     }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider == "credentials") {
//         return true;
//       }
//       if (account?.provider == "github") {
//         await Connect();
//         try {
//           const existingUser = await User.findOne({ email: user.email });
//           if (!existingUser) {
//             const newUser = new User({
//               email: user.email,
//             });

//             await newUser.save();
//             return true;
//           }
//           return true;
//         } catch (err) {
//           console.log("Error saving user", err);
//           return false;
//         }
//       }
//     },
//   },
//   adapter: MongoDBAdapter(clientPromise),
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
