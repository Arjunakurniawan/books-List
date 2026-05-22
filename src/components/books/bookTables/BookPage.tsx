import { DataTable } from "@/components/books/bookTables/BookDataTable";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { createColumns } from "./bookColumns";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useBooks, useDeleteBooks } from "@/hooks/books/useBooks";

export default function BookTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchItem, setSearchItem] = useState("");

  const { isLoading, data, isPlaceholderData } = useBooks(
    currentPage,
    pageSize,
  );

  const deleteMutation = useDeleteBooks();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure want to delete this book?")) {
      deleteMutation.mutate(id);
    }
  };

  const filteredBooks =
    data?.data?.filter((book) =>
      book.name.toLowerCase().includes(searchItem.toLowerCase()),
    ) || [];

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
            onChange={(e) => {
              (setSearchItem(e.target.value), setCurrentPage(1));
            }}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <DataTable
        columns={columns}
        data={filteredBooks}
        currentPage={currentPage}
        total={data?.total || 0}
        pageSize={pageSize}
        onPageChange={(Page) => setCurrentPage(Page)}
        isLoading={isLoading || isPlaceholderData}
      />
    </>
  );
}
