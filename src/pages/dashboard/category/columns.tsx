import DeleteCategoryDialog from "@/components/Dialog/category/DeleteCategory";
import EditCategoryDialog from "@/components/Dialog/category/EditCategory";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Product = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  deleted_at: string | null;
};

export const columns= (refetch: () => void): ColumnDef<Product>[] => [
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
        <EditCategoryDialog id={row.original.id.toString()} onSuccess={refetch} />
        <DeleteCategoryDialog id={row.original.id.toString()} onSuccess={refetch} />
      </div>
    ),
  }
];
