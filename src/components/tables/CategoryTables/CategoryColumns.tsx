import { Button } from "@/components/ui/button";
// import DeleteButton from "@/components/utils/DeleteButton";
// import { deleteCategory } from "@/services/category";
import type { CategoryResponse } from "@/types/ApiResponse.type";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  PenLine,
  Trash,
} from "lucide-react";

export const createColumns = (
  onDelete?: (id: string) => void, // onRefresh?: () => void,
): ColumnDef<CategoryResponse>[] => [
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
    cell: ({ row }) => {
      const handleDelete = async () => {
        try {
          if (onDelete) {
            await onDelete(row.original.id as string);
          }
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      };
      return (
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
            className="flex items-center gap-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white px-2 py-1 rounded p-3 h-10"
            type="button"
            aria-label="Delete"
            onClick={handleDelete}
          >
            <Trash className="w-4 h-4" />
          </Button>
          {/* <DeleteButton
            itemId={row.original.id as string}
            itemName={row.original.name}
            deleteFunction={async (id: string) => {
              await deleteCategory(id);
            }}
            onRefresh={onRefresh}
            onDelete={onDelete}
          /> */}
        </div>
      );
    },
  },
];
