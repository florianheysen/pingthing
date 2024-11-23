import { AppNav } from "@/components/app-nav"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect, useSearchParams } from "next/navigation"

import DashboardContent from "./content"
import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { PaymentSuccessModal } from "@/components/payment-success-modal"

interface PageProps {
  searchParams: {
    success: string | string[] | undefined
  }
}

const DashboardPage = async ({ searchParams }: PageProps) => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/welcome")
  }

  const breadcrumbs = [{ name: "Dashboard" }]

  const success = searchParams.success

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <AppNav
        breadcrumbs={breadcrumbs}
        cta={
          <CreateEventCategoryModal>
            <Button>Add Category</Button>
          </CreateEventCategoryModal>
        }
      />
      <DashboardContent />
    </>
  )
}

export default DashboardPage
