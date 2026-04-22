/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editCategory } from "@/services/category";
import type { CategoryResponse } from "@/types/ApiResponse.type";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  PenLine,
  Plus,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const createColumns = (
  onDelete?: (id: string) => void,
  onrefresh?: () => void,
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
      const [dialogOpen, setDialogOpen] = useState(false);
      const [categoryName, setCategoryName] = useState(row.original.name);

      const handleDelete = async () => {
        try {
          if (onDelete) {
            onDelete(row.original.id as string);
          }
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      };

      const handleSubmit = async () => {
        if (!categoryName.trim()) {
          alert("Category name is required");
          return;
        }

        try {
          await editCategory(row.original.id as string, {
            name: categoryName,
          });
          alert("Category edited successfully");

          if (onrefresh) {
            onrefresh();
          }

          setDialogOpen(false);
        } catch (error) {
          console.error("Error editing category:", error);
        }
      };

      return (
        <>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1 text-black dark:text-white px-2 py-1 rounded p-3 h-10"
              type="button"
              aria-label="Edit"
              onClick={() => setDialogOpen(true)}
            >
              <PenLine className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-1 text-black dark:text-white px-2 py-1 rounded p-3 h-10"
              type="button"
              aria-label="Delete"
              onClick={handleDelete}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-96 relative">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent className="sm:max-w-[425px] dark:bg-neutral-950 border dark:border-neutral-800">
                <DialogHeader>
                  <DialogTitle>Edit Category</DialogTitle>
                  <DialogDescription>Edit a new category</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  {/* Input Field */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-left">Name</Label>
                    <Input
                      id="category-name"
                      placeholder="Enter category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="col-span-4 border border-neutral-800 outline-none dark:focus-visible:border-blue-800"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                    />
                  </div>
                </div>

                <DialogFooter className="flex flex-row gap-3 justify-end">
                  <Link to="/categories">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      className="dark:bg-neutral-950 border dark:border-neutral-800"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button onClick={handleSubmit} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      );
    },
  },
];
