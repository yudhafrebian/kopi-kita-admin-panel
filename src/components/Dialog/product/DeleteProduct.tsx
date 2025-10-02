import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProduct } from "@/utils/apiHelper";
import { useState } from "react";
import { toast } from "sonner";

interface IDeleteProductDialogProps {
  id: string;
  onSuccess: () => void;
}

const DeleteProductDialog: React.FunctionComponent<
  IDeleteProductDialogProps
> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const deleteItem = async () => {
    try {
      const response = await deleteProduct(props.id);
      console.log(response);
      setOpen(false);
      toast.success(response?.data?.message);
      if(props.onSuccess) {
        props.onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Produk</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus produk ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={deleteItem} type="submit">
            Hapus
          </Button>
          <Button onClick={() => setOpen(false)} variant="outline">
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
