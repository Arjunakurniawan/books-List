import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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

interface DeleteButtonProps {
  itemId: string;
  itemName: string;
  onDelete?: () => void;
  deleteFunction: (id: string) => Promise<void>;
  title?: string;
  description?: string;
}

const DeleteButton = ({
  itemId,
  itemName,
  onDelete,
  deleteFunction,
  title = "Delete Item",
  description,
}: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFunction(itemId);
      console.log("Item deleted successfully");
      setIsOpen(false);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const defaultDescription = `Are you sure you want to delete "${itemName}"?`;

  return (
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
  );
};

export default DeleteButton;
