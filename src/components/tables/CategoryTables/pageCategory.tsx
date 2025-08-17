import type { CategoryResponse } from "@/types/ApiResponse.type";
import { useState, useEffect } from "react";
import { getCategories } from "@/services/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableCategory } from "./dataTableCategory";
import { columns } from "./CategoryColumns";

export default function CategoryTable() {
  const [category, setCategory] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setCategory(response);
        console.log("Fetched categories:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10">
      <div className="flex gap-96">
        <Button
          className="mb-4 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-normal"
          variant={"outline"}
        >
          Add Category
        </Button>

        <Input
          placeholder="Search categories..."
          className="mb-4 w-80 float-right"
        />
      </div>
      <DataTableCategory columns={columns} data={category} />
    </div>
  );
}
