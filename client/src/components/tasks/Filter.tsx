import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { taskSchema } from "./data/schema"
import tasksData from "./data/tasks.json"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

export default function Filter() {
  const tasks = z.array(taskSchema).parse(tasksData)

  return (
    <>
      <div className="md:hidden">
      </div>
      <div className="hidden w-[230px] max-h-[670px] flex-col gap-1 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2 mb-4">
            <h2 className="text-xl font-bold tracking-tight">Категории</h2>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>  
    </>
  )
}
