import { columns } from "@/components/tables/bookTables/bookColumns";
import { DataTable } from "@/components/tables/bookTables/dataTableBook";
import type { BookResponse } from "@/types/ApiResponse.type";
import { useState, useEffect } from "react";
import { getBooks } from "@/services/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function BookTable() {
  const [book, setBook] = useState<BookResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBooks();
        setBook(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-10 pr-8">
      <Button
        className="mb-4 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-normal"
        variant={"outline"}
      >
        <Plus />
        Add Book
      </Button>

      <div className="relative mb-4 w-80 float-right">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-4 h-4 text-gray-400" />
        </span>
        <Input placeholder="Search books..." className="pl-10 w-full" />
      </div>
      <DataTable columns={columns} data={book} />
    </div>
  );
}
