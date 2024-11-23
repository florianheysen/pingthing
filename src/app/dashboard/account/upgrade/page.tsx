import { AppNav } from "@/components/app-nav"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import UpgradePageContent from "./content"

const UpgradePage = async () => {
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
    { name: "Upgrade" },
  ]

  return (
    <>
      <AppNav breadcrumbs={breadcrumbs} />
      <UpgradePageContent plan={user.plan} />
    </>
  )
}

export default UpgradePage
