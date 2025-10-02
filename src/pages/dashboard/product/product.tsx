import { fetchProduct } from "@/utils/apiHelper";
import { columns, type Product } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const getProduct = async () => {
    try {
      const getData = await fetchProduct();
      setData(getData?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">
          Manajemen Produk
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Halaman untuk mengelola produk
        </p>
      </div>

      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default ProductPage;
