import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createCategory } from "@/services/category";

interface CategoryCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CategoryCreateScreen({
  open,
  onOpenChange,
  onSuccess,
}: CategoryCreateDialogProps) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

      // Show success for 1 second then close
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        onSuccess?.(); // Call parent callback if provided
      }, 1000);
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      // Reset form when closing
      setCategoryName("");
      setError("");
      setSuccess(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription className="pt-2">
            Add a new category
          </DialogDescription>
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
              className="col-span-4"
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
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading || success}
          >
            Cancel
          </Button>
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
  );
}
