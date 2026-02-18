import { Button } from "@/components/ui/button";
// import DeleteButton from "@/components/utils/DeleteButton";
// import { deleteBook } from "@/services/book";
import type { BookResponse } from "@/types/ApiResponse.type";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, PenLine } from "lucide-react";

export const createColumns = () // onRefresh?: () => void,
// onDelete?: () => void
: ColumnDef<BookResponse>[] => [
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
      return (
        <span>
          {description.length > 100
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
        {/* <DeleteButton
          itemId={row.original.id as string}
          itemName={row.original.name}
          deleteFunction={async (id: string) => {
            await deleteBook(id);
          }}
          onRefresh={onRefresh}
          onDelete={onDelete}
        /> */}
      </div>
    ),
  },
];
