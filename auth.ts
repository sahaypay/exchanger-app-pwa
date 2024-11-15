import NextAuth, { DefaultSession } from "next-auth"
import "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
import { ZodError } from "zod"
import { authApi } from "@/lib/api"

import "next-auth"

declare module "next-auth" {
  interface User {
    is2FADone: boolean
  }

  interface Session {
    user: {
      is2FADone: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    is2FADone: boolean
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.is2FADone = false
      }
      return token
    },
    async session({ session, token }) {
      session.user.is2FADone = token.is2FADone
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "m@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("credentials ", credentials)
          const { email, password } = await signInSchema.parseAsync(credentials)

          const data = await authApi.login(email, password)

          if (!data.success) {
            throw new Error(data.error || "Invalid credentials")
          }

          return data
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error(error.errors[0].message)
          }
          throw error
        }
      },
    }),
  ],
})
