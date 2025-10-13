import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, Trash } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface DeleteButtonProps {
  itemId: string;
  itemName: string;
  onDelete?: () => void;
  onRefresh?: () => void;
  deleteFunction: (id: string) => Promise<void>;
  title?: string;
  description?: string;
}

const DeleteButton = ({
  itemId,
  itemName,
  onDelete,
  onRefresh,
  deleteFunction,
  title = "Delete Item",
  description,
}: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setSuccess(false);
    setError("");

    try {
      await deleteFunction(itemId);
      setSuccess(true);

      if (onDelete) {
        onDelete();
      }

      // Tutup dialog dan refresh data setelah 1.5 detik
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);

        if (onRefresh) {
          onRefresh();
        }
      }, 1000);
    } catch (error) {
      console.error("Error deleting item:", error);

      setSuccess(false);
      setError("Failed to delete item. Please try again.");

      // Tutup dialog setelah 3 detik jika error
      setTimeout(() => {
        setError("");
        setIsOpen(false);
      }, 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  const defaultDescription = `Are you sure you want to delete "${itemName}"?`;

  return (
    <>
      {success && (
        <Alert
          variant="default"
          className="animate-fade-left-in bg-green-100 dark:bg-green-900/20 dark:text-green-400 border-green-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-green-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleCheckBig color="#4ade80" size={15} />
          <AlertTitle>Item Deleted Successfully</AlertTitle>
          <AlertDescription>
            You have successfully deleted "{itemName}".
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert
          variant="destructive"
          className="animate-fade-left-in bg-red-100/85 dark:bg-red-900/45 dark:text-red-400 border-red-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-red-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleCheckBig color="#ef4444" size={15} />
          <AlertTitle>Error Deleting Item</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              <span
                dangerouslySetInnerHTML={{
                  __html: description || defaultDescription,
                }}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="dark:bg-neutral-950 border dark:border-neutral-800"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
