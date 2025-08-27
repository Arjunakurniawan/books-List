import type { CategoryResponse } from "@/types/ApiResponse.type";
import { useState, useEffect } from "react";
import { getCategories } from "@/services/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { DataTableCategory } from "./dataTableCategory";
import { columns } from "./CategoryColumns";
import CategoryCreateScreen from "@/screens/categories/CategoryCreateScreen";
import { Link } from "react-router-dom";

export default function CategoryTable() {
  const [category, setCategory] = useState<CategoryResponse[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleCategoryCreated = async () => {
    // Refresh data after category is created
    try {
      const response = await getCategories();
      setCategory(response);
      console.log("Refreshed categories:", response);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  return (
    <div className="py-10">
      <div className="flex gap-96">
        <Link to="/category/create">
          <Button
            onClick={() => setDialogOpen(true)}
            className="mb-4 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-normal gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </Link>

        <Input
          placeholder="Search categories..."
          className="mb-4 w-80 float-right"
        />
      </div>
      <DataTableCategory columns={columns} data={category} />

      {/* Category Create Dialog */}
      <CategoryCreateScreen
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleCategoryCreated}
      />
    </div>
  );
}
