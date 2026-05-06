import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        nik: {},
        password: {},
      },

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            nik: Number(credentials.nik),
          },
        });

        if (!user) {
          throw new Error("User tidak ditemukan");
        }

        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) {
          throw new Error("Password salah");
        }

        return {
          id: user.nik.toString(),
          nik: user.nik,
          nama: user.nama,
          profil: user.profil,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.nik = user.nik;
        token.nama = user.nama;
        token.profil = user.profil;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        nik: token.nik,
        nama: token.nama,
        profil: token.profil,
      };

      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
};
