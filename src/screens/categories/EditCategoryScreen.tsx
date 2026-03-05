import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { CircleAlert, CircleCheckBig, Link, Plus } from "lucide-react";
import { Label } from "recharts";

import { useState } from "react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCategories } from "@/services/category";
import type { CategoryResponse } from "@/types/ApiResponse.type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface EditCategoryScreenProps {
  category: CategoryResponse;
  
}

export function EditCategoryScreen({ category }: EditCategoryScreenProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setCategoryName(category.name);
      setError("");
      setSuccess(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      setSuccess(true);
    } catch (err) {
      setError("Failed to edit category." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-96 relative">
      {/* Success Alert */}
      {success && (
        <Alert
          variant="default"
          className="animate-fade-left-out bg-green-100 dark:bg-green-900/20 dark:text-green-400 border-green-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-green-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleCheckBig color="#4ade80" size={15} />
          <AlertTitle>Category Created Successfully</AlertTitle>
          <AlertDescription>
            You have successfully created a new category.
          </AlertDescription>
        </Alert>
      )}
      {/* Error Alert */}
      {error && (
        <Alert
          variant="destructive"
          className="animate-fade-left-out bg-red-100/85 dark:bg-red-900/45 dark:text-red-400 border-red-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-red-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleAlert color="#ef4444" size={15} />
          <AlertTitle>Error Creating Category</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Link to="/category/create">
            <Button
              className="mb-4 text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white font-normal gap-2"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Edit Category
            </Button>
          </Link>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark:bg-neutral-950 border dark:border-neutral-800">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Edit an existing category</DialogDescription>
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
                disabled={loading || success}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // handleSubmit();
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
            <Button onClick={handleSubmit} className="gap-2">
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
  );
}

export default EditCategoryScreen;
