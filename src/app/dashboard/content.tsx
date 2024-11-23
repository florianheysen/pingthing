"use client"

import React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { client } from "../lib/client"
import { format, formatDistanceToNow } from "date-fns"
import { BarChart2, Clock, Database, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { DashboardEmptyState } from "./empty"

const DashboardContent = () => {
  const [deletingCategory, setDeletingCategory] = React.useState<string | null>(
    null
  )

  const queryClient = useQueryClient()

  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const { categories } = await res.json()
      return categories
    },
  })

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationKey: ["delete-category"],
      mutationFn: async (name: string) => {
        await client.category.deleteCategory.$post({ name })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
        setDeletingCategory(null)
      },
    }
  )

  if (isEventCategoriesLoading) {
    return <div>Loading...</div>
  }

  if (!categories || categories.length === 0) {
    return <DashboardEmptyState />
  }

  return (
    <>
      <ul className="grid max-w-6xl grid-cols-1 lg:gris-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category) => (
          <li
            key={category.id}
            className="relative group z-10 transition-all duration-200 hover:-translate-y-0.5 border rounded-lg overflow-hidden"
          >
            <div className="absolute z-0 inset-px rounded-lg" />

            <div
              className="pointer-events-none z-0 inset-px rounded-lg transition-all duration-300 border border-t-2"
              style={{
                borderColor: category.color
                  ? `#${category.color.toString(16).padStart(6, "0")}`
                  : "#f3f4f6",
              }}
            />

            <div className="relative p-6 z-10">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="size-12 rounded-full flex items-center justify-center"
                  style={{
                    background: category.color
                      ? `#${category.color.toString(16).padStart(6, "0")}33`
                      : "#f3f4f61A",
                  }}
                >
                  {category.emoji || "📅"}
                </div>

                <div>
                  <h3 className="text-lg/7 font-medium tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-sm/6">
                    {format(category.createdAt, "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm/5">
                  <Clock className="size-4 mr-2" />
                  <span className="font-medium">Last ping:</span>
                  <span className="ml-1">
                    {category.lastPing
                      ? formatDistanceToNow(category.lastPing.createdAt) +
                        " ago"
                      : "Never"}
                  </span>
                </div>
                <div className="flex items-center text-sm/5">
                  <Database className="size-4 mr-2" />
                  <span className="font-medium">Unique fields:</span>
                  <span className="ml-1">{category.uniqueFieldCount || 0}</span>
                </div>
                <div className="flex items-center text-sm/5">
                  <BarChart2 className="size-4 mr-2" />
                  <span className="font-medium">Events this month:</span>
                  <span className="ml-1">{category.eventsCount || 0}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/dashboard/category/${category.name}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "text-sm",
                  })}
                >
                  See details
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-red-500 transition-colors"
                  aria-label={`Delete ${category.name} category`}
                  onClick={() => setDeletingCategory(category.name)}
                >
                  <Trash2 className="size-5" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        showModal={Boolean(deletingCategory)}
        setShowModal={() => setDeletingCategory(null)}
        className="max-w-md p-8"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-lg/7 font-medium tracking-tight">
              Delete Category
            </h2>
            <p className="text-sm/6">
              Are you sure you want to delete the category &quot;
              <span className="font-medium">
                {deletingCategory}
              </span>&quot;? <br /> This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setDeletingCategory(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeletingCategory}
              onClick={() =>
                deletingCategory && deleteCategory(deletingCategory)
              }
            >
              {isDeletingCategory ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DashboardContent
