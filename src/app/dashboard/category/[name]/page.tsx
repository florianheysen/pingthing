import { AppNav } from "@/components/app-nav"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import CategoryPageContent from "./content"

interface PageProps {
  params: {
    name: string | string[] | undefined
  }
}

const CategoryPage = async ({ params }: PageProps) => {
  if (typeof params.name !== "string") return notFound()

  const auth = await currentUser()

  if (!auth) notFound()

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) return notFound()

  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: params.name,
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  })

  if (!category) return notFound()

  const hasEvents = category._count.events > 0

  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: category.emoji + " " + category.name + " events " },
  ]

  return (
    <>
      <AppNav breadcrumbs={breadcrumbs} />
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </>
  )
}

export default CategoryPage
