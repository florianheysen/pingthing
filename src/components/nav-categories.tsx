"use client"

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { client } from "@/app/lib/client"
import Link from "next/link"
import { Skeleton } from "./ui/skeleton"

export function NavCategories() {
  const { isMobile } = useSidebar()

  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const { categories } = await res.json()
      return categories
    },
  })

  if (isEventCategoriesLoading)
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Event Categories</SidebarGroupLabel>
        <SidebarMenu>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <SidebarMenuItem key={i}>
                <Skeleton className="h-[32px] w-full" />
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroup>
    )

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Event Categories</SidebarGroupLabel>
      <SidebarMenu>
        {categories?.map((cat) => (
          <SidebarMenuItem key={cat.name}>
            <SidebarMenuButton asChild>
              <Link href={`/dashboard/category/${cat.name}`}>
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>See details</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete category</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
