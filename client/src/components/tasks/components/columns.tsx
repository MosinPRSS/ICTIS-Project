"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "../../ui/badge"
import { Checkbox } from "../../ui/checkbox"

import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const allRows = table.getPreFilteredRowModel().rows;
      
      const allSelected = allRows.length > 0 && allRows.every(row => row.getIsSelected());
    
      const someSelected = allRows.some(row => row.getIsSelected());

      return (
        <div className="flex items-center justify-center h-full">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected && !allSelected}
            onCheckedChange={() => {
              // Выбираем/снимаем ВСЕ строки таблицы
              table.toggleAllRowsSelected(!allSelected)
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center h-full">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Выбрать все" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Badge variant={'outline'}>{row.getValue("title")}</Badge>
          </span>
        </div>
      )
    },
  },
]
