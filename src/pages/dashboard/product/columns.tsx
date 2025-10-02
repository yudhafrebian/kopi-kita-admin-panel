import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  created_at: string;
  deleted_at: string | null;
  categories: {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    deleted_at: string | null;
  };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({column }) => {
      return (
        <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      `${row.original.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      })}`,
  },
  {
    accessorFn: (row) => row.categories.name,
    id: "category",
    header: "Kategori",
    cell: ({ row }) => row.original.categories.name,
  },   
  {
    accessorKey: "created_at",
    header: ({column }) => {
      return (
        <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Dibuat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("id-ID"),
  },
  {
    header: "Aksi",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size={"sm"}>Edit</Button>
        <Button variant={"destructive"} size={"sm"}>Hapus</Button>
      </div>
    ),
  }
];
