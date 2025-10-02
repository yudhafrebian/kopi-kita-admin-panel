import { fetchCategory } from "@/utils/apiHelper";
import { columns, type Product } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const getCategory = async () => {
    try {
      const getData = await fetchCategory();
      console.log("Fetched:", getData?.data?.data);
      setData(getData?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-xl md:text-3xl font-bold">
          Manajemen Produk
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Halaman untuk mengelola produk
        </p>
      </div>

      <div>
        <DataTable columns={columns(getCategory)} data={data} />
      </div>
    </>
  );
};

export default CategoryPage;
