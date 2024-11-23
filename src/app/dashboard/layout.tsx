import { cookies } from "next/headers"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 pt-6 px-4 md:px-10 lg:px-20">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
