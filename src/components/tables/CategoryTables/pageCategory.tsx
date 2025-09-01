import type { CategoryResponse } from "@/types/ApiResponse.type";
import { useState, useEffect, useCallback } from "react";
import { getCategories, createCategory } from "@/services/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { DataTableCategory } from "./dataTableCategory";
import { createColumns } from "./CategoryColumns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export default function CategoryTable() {
  const [category, setCategory] = useState<CategoryResponse[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Function to refresh categories data
  const refreshCategories = useCallback(async () => {
    try {
      const response = await getCategories();
      setCategory(response);
      console.log("Refreshed categories:", response);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  }, []);

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  // Create columns with refresh callback
  const columns = createColumns(refreshCategories);

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createCategory({
        name: categoryName.trim(),
      });

      setSuccess(true);
      setCategoryName("");

      // Refresh data using the callback
      await refreshCategories();

      // Show success for 1 second then close
      setTimeout(() => {
        setDialogOpen(false);
        setSuccess(false);
      }, 1000);
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      // Reset form when closing
      setCategoryName("");
      setError("");
      setSuccess(false);
    }
  };

  return (
    <div className="py-10">
      <div className="flex gap-96">
        <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Link to="/category/create">
              <Button
                className="mb-4 text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white font-normal gap-2"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </Link>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-neutral-950 border dark:border-neutral-800">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>Add a new category</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Success Message */}
              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                    ✅ Category created successfully!
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                  <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                    ❌ {error}
                  </p>
                </div>
              )}

              {/* Input Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category-name" className="text-left">
                  Name
                </Label>
                <Input
                  id="category-name"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="col-span-4 border border-neutral-800 outline-none dark:focus-visible:border-blue-800"
                  disabled={loading || success}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <Link to="/categories">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  disabled={loading || success}
                  className="dark:bg-neutral-950 border dark:border-neutral-800"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={handleSubmit}
                disabled={loading || success || !categoryName.trim()}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Create Category
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Input
          placeholder="Search categories..."
          className="mb-4 w-80 float-right"
        />
      </div>
      <DataTableCategory columns={columns} data={category} />
    </div>
  );
}
