import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCategory } from "@/utils/apiHelper";
import { useState } from "react";
import { toast } from "sonner";

interface IDeleteCategoryDialogProps {
  id: string;
  onSuccess: () => void;
}

const DeleteCategoryDialog: React.FunctionComponent<
  IDeleteCategoryDialogProps
> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const deleteItem = async () => {
    try {
      const response = await deleteCategory(props.id);
      console.log(response);
      setOpen(false);
      toast.success(response?.data?.message);
      if (props.onSuccess) {
        props.onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Kategori</DialogTitle>
          <DialogDescription className="text-left">
            Apakah anda yakin ingin menghapus kategori ini?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 justify-end">
          <Button variant={"destructive"} onClick={deleteItem} type="submit">
            Hapus
          </Button>
          <Button onClick={() => setOpen(false)} variant="outline">
            Batal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
