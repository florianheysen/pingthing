"use client"

import { client } from "@/app/lib/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Modal } from "./ui/modal"
import { Button } from "./ui/button"
import { CheckIcon } from "lucide-react"

export const PaymentSuccessModal = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { data, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get()
      return await res.json()
    },
    refetchInterval: (query) => {
      return query.state.data?.plan === "PRO" ? false : 1000
    },
  })

  const handleClose = () => {
    setIsOpen(false)
    router.push("/dashboard")
  }

  const isPaymentSuccessful = data?.plan === "PRO"

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={!isPaymentSuccessful}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessful ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg/7 font-medium">Upgrading your account...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-lg/7 font-medium">Upgrade successful!</p>
              <p className="text-sm/6 text-muted-foreground">
                You can now access all PRO features.
              </p>
            </div>

            <div className="mt-8 w-full">
              <Button className="h-12 w-full" onClick={handleClose}>
                <CheckIcon className="mr-2 size-5" /> Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
