import { signIn, signOut } from "@/auth"

export async function login(formData: FormData) {
  "use server"
  await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirectTo: "/two-factor-auth"
  })
}

export async function logout() {
  "use server"
  await signOut()
}
