import { Button } from "@/components/ui/button"
import { UserButton, SignIn, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"

const Page = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <SignedIn>
        <UserButton />
        <Link href="/dashboard">
          <Button variant="link">Dashboard</Button>
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button variant="link">Sign in</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="link">Sign up</Button>
        </Link>
      </SignedOut>
    </section>
  )
}

export default Page
