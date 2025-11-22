import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface DeleteProductConfirmProps {
  productId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteProductConfirm({ productId, onClose, onSuccess }: DeleteProductConfirmProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/products/${productId}`);
      toast({ title: "Deleted", description: "Product deleted successfully" });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      const message = errObj?.response?.data?.message ?? errObj?.message ?? "Unable to delete product";
      toast({ title: "Delete failed", description: message, variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
