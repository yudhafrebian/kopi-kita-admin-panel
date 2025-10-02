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
import { postCategory } from "@/utils/apiHelper";
import { useState } from "react";
import { toast } from "sonner";

export type CategoryForm = {
  category: string;
};

const AddCategoryDialog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>();

  const onSubmit: SubmitHandler<CategoryForm> = async (data: CategoryForm) => {
    try {
      setLoading(true);
      const response = await postCategory(data.category);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Tambah Kategori</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kategori</DialogTitle>
          <DialogDescription>Masukkan kategori baru</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="category" className="mb-2">Nama Kategori</Label>
            <Input
              type="text"
              id="category"
              {...register("category", {
                required: "Nama Kategori harus diisi",
              })}
              className={errors.category ? "border-red-500" : ""}
            />
            {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
          </div>
          {loading ? (
            <Button type="submit" disabled>
              Menambah Kategori...
            </Button>
          ) : (
            <Button type="submit">Tambah Kategori</Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
