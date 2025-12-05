import { columns } from "@/components/tables/bookTables/bookColumns";
import { DataTable } from "@/components/tables/bookTables/dataTableBook";
import type { BookResponse } from "@/types/ApiResponse.type";
import { useState, useEffect } from "react";
import { getBooks } from "@/services/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="py-10 px-16">
      <Link to="/book/create">
        <Button
          className="mb-4 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-normal"
          variant={"outline"}
        >
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </Link>

      <Input placeholder="Search books..." className="mb-4 w-80 float-right " />
      <DataTable columns={columns()} data={book} />
    </div>
  );
}
