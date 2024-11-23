"use client"

// sync auth status to database

import { client } from "@/app/lib/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const WelcomePage = () => {
  const router = useRouter()

  const { data } = useQuery({
    queryFn: async () => {
      const res = await client.auth.getDatabaseSyncStatus.$get()
      return await res.json()
    },
    queryKey: ["get-database-sync-status"],
    refetchInterval: (query) => {
      return query.state.data?.isSynced ? false : 1000
    },
  })

  useEffect(() => {
    if (data?.isSynced) router.push("/dashboard")
  }, [data, router])

  return (
    <div className="h-full items-center justify-center">
      Creating your account...
    </div>
  )
}

export default WelcomePage
