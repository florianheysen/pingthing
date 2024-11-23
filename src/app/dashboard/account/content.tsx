"use client"

import { client } from "@/app/lib/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const AccountPageContent = ({
  discordId: initialDiscordId,
  apiKey,
}: {
  discordId: string
  apiKey: string
}) => {
  const [discordId, setDiscordId] = useState(initialDiscordId)
  const [copySuccess, setCopySuccess] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const res = await client.project.setDiscordId.$post({ discordId })
      return await res.json()
    },
  })

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="max-w-xl w-full space-y-4 p-6">
        <div>
          <Label>Discord Id</Label>
          <Input
            className="mt-1"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            placeholder="Enter your Discord ID"
          />
          <p className="mt-2 text-sm/6">
            Dont know your Discord ID?{" "}
            <Link
              href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Follow this guide
            </Link>
          </p>
        </div>
        <div className="pt-4">
          <Button onClick={() => mutate(discordId)} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>

      <Card className="max-w-xl w-full space-y-4 p-6">
        <div>
          <Label>Your API Key</Label>
          <div className="mt-1 relative">
            <Input type="password" value={apiKey} readOnly />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
              <Button
                variant="ghost"
                onClick={copyApiKey}
                disabled={isPending}
                className="px-2 py-1 rounded-md focus:outline-none size-7"
              >
                {copySuccess ? (
                  <CheckIcon className="size-3" />
                ) : (
                  <ClipboardIcon className="size-3" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm/6">
          Keep your API key safe and don't share it with anyone. You can
          generate a new one at any time.
        </p>
      </Card>
    </div>
  )
}

export default AccountPageContent
