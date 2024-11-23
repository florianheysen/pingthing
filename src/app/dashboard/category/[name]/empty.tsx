import { client } from "@/app/lib/client"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const CategoryPageEmpty = ({ categoryName }: { categoryName: string }) => {
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    queryFn: async () => {
      const res = await client.category.pollCategory.$get({
        name: categoryName,
      })

      return await res.json()
    },
    refetchInterval(query) {
      return query.state.data?.hasEvents ? false : 1000
    },
  })

  const hasEvents = data?.hasEvents

  useEffect(() => {
    if (hasEvents) {
      router.refresh()
    }
  }, [hasEvents, router])

  const codeSnippet = `await fetch('http://localhost:3000/api/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: user id
      field2: 'value2' // for example: user email
    }
  })
})`

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
      <h1 className="mt-2 text-xl/8 font-medium tracking-tight">
        No {categoryName} events yet
      </h1>

      <p className="text-sm/6 max-w-prose mt-2 mb-8">
        Get started by sending a request to the tracking API.
      </p>

      <CodeBlock
        className="w-[500px]"
        value={codeSnippet}
        darkMode
        language="js"
      />

      <p className="mt-8 flex items-center space-x-2">
        <span className="size-2 bg-primary rounded-full animate-pulse" />
        <span className="text-sm/6">Listening to incoming events...</span>
      </p>

      <Button
        className="text-xs"
        variant="link"
        onClick={() => router.refresh()}
      >
        Refresh
      </Button>
    </div>
  )
}

export default CategoryPageEmpty
