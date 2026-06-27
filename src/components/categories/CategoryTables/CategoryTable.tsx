import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert, CircleCheckBig, Plus } from "lucide-react";
import { DataTable } from "./CategoryDataTable";
import { createColumns } from "./CategoryCreateColumns";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useCategories,
  useCreateCategories,
} from "@/hooks/categories/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/lib/validation";
import { useForm } from "react-hook-form";

export default function CategoryTable() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const formCategory = useForm<{ name: string }, any, { name: string }>({
    resolver: zodResolver(CategorySchema),
    values: { name: "" },
  });

  const [status, setStatus] = useState<{
    type: "Success" | "Error" | null;
    msg: string;
  }>({ type: null, msg: "" });

  const { data } = useCategories(searchItem);
  const createMutation = useCreateCategories();

  const showAlert = (type: "Success" | "Error", msg: string) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus({ type: null, msg: "" }), 4000);
  };

  const handleSubmit = async () => {
    createMutation.mutate(
      { name: formCategory.getValues().name.trim() } as any,
      {
        onSuccess: () => {
          showAlert("Success", "category created successfully");
          formCategory.reset();
          setTimeout(() => setDialogOpen(false), 500);
        },
        onError: () => showAlert("Error", "Error created category"),
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      formCategory.reset();
      setStatus({ type: null, msg: "" });
    }
  };

  const columns = createColumns(showAlert);

  return (
    <div className="py-10 px-2 lg:px-4">
      {/* Success Alert */}
      {status.type === "Success" && (
        <Alert
          variant="default"
          className="animate-fade-left-out bg-green-100 dark:bg-green-900/20 dark:text-green-400 border-green-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-green-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleCheckBig color="#4ade80" size={15} />
          <AlertTitle>{status.type}</AlertTitle>
          <AlertDescription>{status.msg}</AlertDescription>
        </Alert>
      )}
      {/* Error Alert */}
      {status.type === "Error" && (
        <Alert
          variant="destructive"
          className="animate-fade-left-out bg-red-100/85 dark:bg-red-900/45 dark:text-red-400 border-red-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-red-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleAlert color="#ef4444" size={15} />
          <AlertTitle>{status.type}</AlertTitle>
          <AlertDescription>{status.msg}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-row gap-4 lg:gap-4 mb-4">
        <div className="flex flex-row">
          <form onSubmit={formCategory.handleSubmit(handleSubmit)}>
            <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Link to="/category/create">
                  <Button
                    className="text-xs sm:text-sm text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white font-normal gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2"
                    variant="outline"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Add Category</span>
                    <span className="sm:hidden">Add Category</span>
                  </Button>
                </Link>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] dark:bg-neutral-950 border dark:border-neutral-800">
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>Add a new category</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  {/* Input Field */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category-name" className="text-left">
                      Name
                    </Label>
                    <Input
                      id="category-name"
                      autoComplete="false"
                      placeholder="Enter category name"
                      {...formCategory.register("name")}
                      className="col-span-4 border border-neutral-800 outline-none dark:focus-visible:border-blue-800"
                      disabled={createMutation.isPending}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                    />
                  </div>
                </div>

                <DialogFooter className="sm:flex flex-row">
                  <Link to="/categories">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      disabled={createMutation.isPending}
                      className="dark:bg-neutral-950 border dark:border-neutral-800"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="gap-2">
                    {createMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        creating...
                      </>
                    ) : (
                      <>
                        <Plus className="size-1" />
                        create Category
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </div>
        <Input
          placeholder="Search categories..."
          className="text-xs sm:text-sm h-9 px-2 sm:px-4 w-full sm:w-80"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
}
