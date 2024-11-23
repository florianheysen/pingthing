"use client"

import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <SignIn />
    </section>
  )
}

export default SignInPage
