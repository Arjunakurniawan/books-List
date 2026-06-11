/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import type { BookResponse } from "@/types/ApiResponse.type";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  PenLine,
  Trash,
} from "lucide-react";
import { Link } from "react-router-dom";

export const createColumns = (
  onDelete?: (id: string) => void,
): ColumnDef<BookResponse>[] => [
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
    accessorKey: "description",
    header: "Description",
    cell({ row }) {
      const description = row.getValue("description") as string;
      const isMobile = useIsMobile();

      return (
        <span>
          {isMobile && description.length > 30
            ? description.substring(0, 30) + "..."
            : !isMobile && description.length > 100
              ? description.substring(0, 100) + "..."
              : description}
        </span>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageValue = row.getValue("image") as string | null | undefined;
      const rowData = row.original as BookResponse;

      if (!imageValue) {
        return <span className="text-sm text-muted-foreground">No image</span>;
      }

      return (
        <img
          src={imageValue}
          alt={rowData.name ?? "image"}
          className="w-12 h-12 object-cover rounded"
        />
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as { name: string } | null;
      return category?.name || "no category";
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const handleDelete = () => {
        try {
          if (onDelete) {
            onDelete(row.original.id as string);
          }
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      };
      return (
        <div className="flex gap-2">
          <Link to={"/book/edit/" + row.original.id}>
            <Button
              variant="outline"
              className="flex items-center gap-1 text-black dark:text-white px-2 py-1 rounded p-3 h-10"
              type="button"
              aria-label="Edit"
            >
              <PenLine className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant={"outline"}
            className="flex items-center gap-1 text-black dark:text-white px-2 py-1 rounded p-3 h-10"
            aria-label="Delete"
            type="button"
            onClick={handleDelete}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
