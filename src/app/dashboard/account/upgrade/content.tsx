"use client"

import { client } from "@/app/lib/client"
import { Card } from "@/components/ui/card"
import { Plan } from "@prisma/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { BarChart } from "lucide-react"
import { Span } from "next/dist/trace"
import { useRouter } from "next/navigation"

const UpgradePageContent = ({ plan }: { plan: Plan }) => {
  const router = useRouter()

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const res = await client.project.getUsage.$get()
      return await res.json()
    },
  })

  return (
    <div>
      <h1 className="mt-2 text-xl/8 font-medium tracking-tight">
        Plan: {plan === "PRO" ? "Pro" : "Free"}
      </h1>
      <p className="text-sm/6 max-w-prose">
        {plan === "PRO"
          ? "Thank you for supporting Ping Thing. Find your increased usage limits below."
          : "Get access to more events, categories and premium support."}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <Card className="p-5">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Total events</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {usageData?.eventsUsed || 0} of {usageData?.eventsLimits || 0}
            </p>
            <p className="text-xs/5 text-muted-foreground">
              Events in this period
            </p>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Event Categories</p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-2xl font-bold">
              {usageData?.categoriesUsed || 0} of{" "}
              {usageData?.categoriesLimit || 0}
            </p>
            <p className="text-xs/5 text-muted-foreground">Active categories</p>
          </div>
        </Card>
      </div>

      <p className="text-sm mt-2 text-primary/50">
        Usage will reset{" "}
        {usageData?.resetDate ? (
          format(usageData.resetDate, "MMM d, yyyy")
        ) : (
          <span className="animate-pulse w-8 h-4 bg-primary/20" />
        )}{" "}
        {plan !== "PRO" ? (
          <span
            className="underline text-primary cursor-pointer"
            onClick={() => createCheckoutSession()}
          >
            or upgrade now to increase your limit &rarr;
          </span>
        ) : null}
      </p>
    </div>
  )
}

export default UpgradePageContent
