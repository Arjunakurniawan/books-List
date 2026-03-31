import { DataTable } from "@/components/tables/bookTables/dataTableBook";
import type { BookResponse } from "@/types/ApiResponse.type";
import { useState, useEffect } from "react";
import { deleteBook, getBooks } from "@/services/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { createColumns } from "./bookColumns";

export default function BookTable() {
  const [book, setBook] = useState<BookResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchData = async (page: number = 1) => {
    try {
      const response = await getBooks(page, pageSize);
      setBook(response.data);
      setTotal(response.total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this book?",
      );
      if (confirmed) {
        await deleteBook(id);
        await fetchData(currentPage);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const columns = createColumns(handleDelete);

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
      <DataTable
        columns={columns}
        data={book}
        currentPage={currentPage}
        total={total}
        pageSize={pageSize}
        onPageChange={fetchData}
      />
    </div>
  );
}
