import { Button } from "@/components/ui/button";
import type { CategoryResponse } from "@/types/ApiResponse.type";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  PenLine,
  Trash,
} from "lucide-react";

export const columns: ColumnDef<CategoryResponse>[] = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          className="text-right flex items-center gap-2"
          onClick={() => column.toggleSorting()}
        >
          Name
          {isSorted === "asc" ? (
            <ArrowUpNarrowWide className="w-4 h-4" />
          ) : isSorted === "desc" ? (
            <ArrowDownNarrowWide className="w-4 h-4" />
          ) : (
            <ArrowUpNarrowWide className="w-4 h-4" />
          )}
        </button>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-1 text-black dark:text-white px-2 py-1 rounded p-3 h-10"
          type="button"
          aria-label="Edit"
        >
          <PenLine className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-1 text-black dark:text-white px-2 py-1 rounded p-3 h-10"
          type="button"
          aria-label="Delete"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
