import { DataTable } from "@/components/books/bookTables/BookDataTable";
import type { BookResponse } from "@/types/ApiResponse.type";
import { useState, useEffect } from "react";
import { deleteBook, getBooks } from "@/services/book";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { createColumns } from "./bookColumns";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function BookTable() {
  const [book, setBook] = useState<BookResponse[]>([]);
  const [bookData, setBookData] = useState<BookResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchItem, setSearchItem] = useState("");

  const fetchData = async (page: number = 1) => {
    try {
      const response = await getBooks(page, pageSize);
      setBook(response.data);
      setBookData(response.data);
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

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const filteredBooks = bookData.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setBook(filteredBooks);
    setSearchItem(searchTerm);
    setCurrentPage(1);
  };

  const columns = createColumns(handleDelete);

  return (
    <>
      <div className="pt-10 lg:block flex flex-row gap-5">
        <Link to="/book/create">
          <Button
            className="mb-4 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-normal"
            variant={"outline"}
          >
            <Plus className="h-4 w-4" />
            Add Book
          </Button>
        </Link>
        <InputGroup className="lg:w-72 w-[200px] lg:float-end dark:bg-neutral-900 ">
          <InputGroupInput
            placeholder="Search..."
            value={searchItem}
            onChange={handleInputChange}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <DataTable
        columns={columns}
        data={book}
        currentPage={currentPage}
        total={total}
        pageSize={pageSize}
        onPageChange={fetchData}
      />
    </>
  );
}
