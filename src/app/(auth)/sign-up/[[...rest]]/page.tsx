"use client"

import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <SignUp />
    </section>
  )
}

export default SignUpPage
