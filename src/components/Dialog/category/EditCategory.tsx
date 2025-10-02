import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { fetchCategoryDetail, updateCategory } from "@/utils/apiHelper";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type CategoryForm = {
  category: string;
};

interface EditCategoryDialogProps {
  id: string;
  onSuccess: () => void;
}

const EditCategoryDialog: React.FunctionComponent<EditCategoryDialogProps> = (
  props
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    defaultValues: {
      category: "",
    },
  });

  const onSubmit: SubmitHandler<CategoryForm> = async (data: CategoryForm) => {
    try {
      setLoading(true);
      const response = await updateCategory(props.id, data.category);
      toast.success(response?.data?.message);
      if(props.onSuccess) {
        props.onSuccess();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryDetail = async () => {
    try {
      const response = await fetchCategoryDetail(props.id);
      const data = response?.data?.data.getCategoryDetails;
      reset({
        category: data.name,
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.id) {
      getCategoryDetail();
    }
  }, [props.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Kategori</DialogTitle>
          <DialogDescription>Ubah Nama Kategori</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="category" className="mb-2">
              Nama Kategori
            </Label>
            <Input
              type="text"
              id="category"
              {...register("category", {
                required: "Nama Kategori harus diisi",
              })}
              className={errors.category ? "border-red-500" : ""}
            />
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>
          {loading ? (
            <Button type="submit" disabled>
              Menyimpan Perubahan...
            </Button>
          ) : (
            <Button type="submit">Simpan Perubahan</Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
