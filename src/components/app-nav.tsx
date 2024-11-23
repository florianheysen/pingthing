import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

type BreadcrumbItemType = {
  name: string
  href?: string
}

export const AppNav = ({
  breadcrumbs,
  cta,
}: {
  breadcrumbs: BreadcrumbItemType[]
  cta?: React.ReactNode
}) => {
  return (
    <section className="flex h-16 shrink-0 items-center gap-2 justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem className={!isLast ? "hidden md:block" : ""}>
                    {isLast ? (
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    ) : (
                      <Link href={breadcrumb.href || "#"}>
                        <p className="hover:text-primary transition-color">
                          {breadcrumb.name}
                        </p>
                      </Link>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {cta}
    </section>
  )
}
