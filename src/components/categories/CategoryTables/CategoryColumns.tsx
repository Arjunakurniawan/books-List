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
import type { CategoryResponse } from "@/types/ApiResponse.type";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  PenLine,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useUpdateCategories,
  useDeleteCategories,
} from "@/hooks/categories/useCategories";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const createColumns = (
  showAlert: (type: "Success" | "Error", msg: string) => void,
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

      const updateMutation = useUpdateCategories();
      const deleteMutation = useDeleteCategories();

      const handleDelete = async () => {
        deleteMutation.mutate(row.original.id as string, {
          onSuccess: () => {
            showAlert("Success", "Category deleted successfully");
          },
          onError: () => {
            showAlert("Error", "Error deleting category");
          },
        });
      };

      const handleSubmit = async () => {
        if (!categoryName.trim()) {
          showAlert("Error", "Category name is required");
          return;
        }

        updateMutation.mutate(
          { id: row.original.id as string, data: { name: categoryName } },
          {
            onSuccess: () => {
              if (onrefresh) {
                onrefresh();
              }
              showAlert("Success", "Category edited successfully");
              setTimeout(() => setDialogOpen(false), 500);
            },
            onError: () => {
              showAlert("Error", "Error editing category");
            },
          },
        );
      };

      return (
        <>
1`12`          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1 text-black dark:text-white px-2 py-1 rounded p-3 h-10"
              type="button"
              aria-label="Edit"
              onClick={() => setDialogOpen(true)}
            >
              <PenLine className="w-4 h-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 text-black dark:text-white px-2 py-1 rounded p-3 h-10"
                  type="button"
                  aria-label="Delete"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="dark:bg-neutral-950 border dark:border-neutral-800">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you delete this category?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the category.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="dark:bg-neutral-950 border dark:border-neutral-800">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                      disabled={updateMutation.isPending}
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
                      disabled={updateMutation.isPending}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSubmit}
                    className="gap-2"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <PenLine className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
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
