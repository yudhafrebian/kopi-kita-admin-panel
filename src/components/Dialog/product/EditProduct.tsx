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
import {
  fetchCategory,
  fetchDetailProduct,
  updateProduct,
} from "@/utils/apiHelper";
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

type EditProductDialogProps = {
  id: string;
  onSuccess: () => void;
};

export type ProductForm = {
  name: string;
  description: string;
  price: number;
  image_url: string | FileList;
  category_id: number;
};

const EditProductDialog = ({ id, onSuccess }: EditProductDialogProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image_url: undefined,
      category_id: undefined,
    },
  });

  const onSubmit: SubmitHandler<ProductForm> = async (data: ProductForm) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("category_id", data.category_id.toString());
      if (
        data.image_url &&
        data.image_url.length > 0 &&
        typeof data.image_url === "object"
      ) {
        formData.append("image_url", data.image_url[0]);
      } else if (
        data.image_url &&
        data.image_url.length > 0 &&
        typeof data.image_url === "string"
      ) {
        formData.append("image_url", data.image_url);
      }

      const response = await updateProduct(id, formData);
      console.log(response);
      toast.success(response?.data?.message);
      setOpen(false);
      if (onSuccess) {
        onSuccess();
      }
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDetailProduct = async () => {
    try {
      const response = await fetchDetailProduct(id);
      const data = response?.data?.data.getProductDetails;
      reset({
        name: data.name ?? "",
        description: data.description ?? "",
        price: Number(data.price) || 0,
        image_url: data.image_url ?? undefined,
        category_id: data.category_id,
      });
    } catch (error) {
      console.log(error);
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
    if (id) {
      getDetailProduct();
    }
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Produk</DialogTitle>
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
                {...register("image_url")}
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
                value={String(watch("category_id"))}
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

export default EditProductDialog;
