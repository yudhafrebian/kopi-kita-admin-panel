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
import { fetchCategory, postProduct } from "@/utils/apiHelper";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export type ProductForm = {
  name: string;
  description: string;
  price: number;
  image_url: FileList;
  category_id: number;
};

type AddProductDialogProps = {
  onSuccess?: () => void;
};

const AddProductDialog = ({onSuccess}: AddProductDialogProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductForm>();

  const onSubmit: SubmitHandler<ProductForm> = async (data: ProductForm) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("category_id", data.category_id.toString());
      if (data.image_url && data.image_url.length > 0) {
        formData.append("image_url", data.image_url[0]);
      }

      const response = await postProduct(formData);
      toast.success(response?.data?.message);
      reset();
      setOpen(false);
      if(onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      const response = await fetchCategory();
      setCategories(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    register("category_id", { required: "Kategori harus dipilih" });
  }, [register]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Tambah Produk</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Produk</DialogTitle>
          <DialogDescription>Masukkan produk baru</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label className="mb-2" htmlFor="name">
              Nama Produk
            </Label>
            <div>
              <Input
                type="text"
                id="name"
                {...register("name", {
                  required: "Nama Produk harus diisi",
                })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label className="mb-2" htmlFor="description">
              deskripsi
            </Label>
            <div>
              <Input
                type="text"
                id="description"
                {...register("description", {
                  required: "Deskripsi harus diisi",
                })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label className="mb-2" htmlFor="price">
              Harga
            </Label>
            <div>
              <Input
                type="text"
                id="price"
                {...register("price", {
                  required: "Harga harus diisi",
                })}
                placeholder="Rp.500000"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label className="mb-2" htmlFor="image_url">
              Foto Produk
            </Label>
            <div>
              <Input
                type="file"
                id="image_url"
                {...register("image_url", {
                  required: "Foto harus diisi",
                })}
                className={errors.image_url ? "border-red-500" : ""}
              />
              {errors.image_url && (
                <p className="text-red-500 text-xs">
                  {errors.image_url.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label className="mb-2" htmlFor="category_id">
              Kategori
            </Label>
            <div>
              <Select
                onValueChange={(value) =>
                  setValue("category_id", Number(value), {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger
                  className={
                    errors.category_id ? "border-red-500 w-full" : "w-full"
                  }
                >
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kategori</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.category_id && (
                <p className="text-red-500 text-xs">
                  {errors.category_id.message}
                </p>
              )}
            </div>
          </div>
          {loading ? (
            <Button type="submit" disabled>
              Menambah Produk...
            </Button>
          ) : (
            <Button type="submit">Tambah Produk</Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
