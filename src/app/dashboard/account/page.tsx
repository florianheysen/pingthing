import { AppNav } from "@/components/app-nav"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import AccountPageContent from "./content"

const AccountPage = async () => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/sign-in")
  }

  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Account", href: "/dashboard/account" },
  ]

  return (
    <>
      <AppNav breadcrumbs={breadcrumbs} />
      <AccountPageContent
        discordId={user.discordId ?? ""}
        apiKey={user.apiKey ?? ""}
      />
    </>
  )
}

export default AccountPage
