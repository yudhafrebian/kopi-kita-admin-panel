import type { ColumnDef } from "@tanstack/react-table";

export type Summary = {
  id: string;
  name: string;
  price: number;
  created_at: Date;
  categories: {
    name: string;
  };
};

export const columns: ColumnDef<Summary>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) =>
      `${row.original.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      })}`,
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => row.original.categories.name,
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString("id-ID"),
  },
];
