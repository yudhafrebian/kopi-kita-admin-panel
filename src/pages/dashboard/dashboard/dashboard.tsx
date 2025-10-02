import { useAuth } from "@/context/AuthContext";
import RandomGreeting from "@/utils/Greeting";
import { fetchSummary } from "@/utils/apiHelper";
import { columns, type Summary } from "./columns";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Component } from "lucide-react";

interface DashboardSummary {
  totalProduct: number;
  totalCategory: number;
  newestProduct: Summary[];
}

const Dashboard = () => {
  const { admin } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary>({
    totalProduct: 0,
    totalCategory: 0,
    newestProduct: [],
  });

  const getData = async () => {
    try {
      const getSummary = await fetchSummary();
      setSummary(getSummary?.data.data.summary);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">
          {RandomGreeting()}, {admin?.name}
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Berikut adalah ringkasan data Kopi Kita
        </p>
      </div>
      <div className="mt-18">
        <h2 className="text-2xl font-semibold mt-4 mb-2">Ringkasan Data</h2>
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-green-100">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Produk</CardTitle>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Box className="text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalProduct}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-100">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Kategori</CardTitle>
              <div className="w-10 h-10 bg-[#BF83FF] rounded-full flex items-center justify-center">
                <Component className="text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalCategory}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mt-4 mb-2">Produk Terbaru</h2>
        <DataTable columns={columns} data={summary?.newestProduct || []} />
      </div>
    </>
  );
};

export default Dashboard;
