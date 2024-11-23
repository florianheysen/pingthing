"use client"

import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <SignUp fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome" />
    </section>
  )
}

export default SignUpPage
