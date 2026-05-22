import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import { ArrowLeft, CircleCheckBig, CircleAlert } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import React, { useEffect, useState } from "react";
import type { CategoryResponse } from "@/types/ApiResponse.type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AppBreadcrumb from "@/components/common/AppBreadcrumb";
import { useBookById, useEditBooks } from "@/hooks/books/useBooks";
import { useCategories } from "@/hooks/categories/useCategories";

export default function EditBookScreen() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    categoryId: "",
  });

  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const { id } = useParams();
  const navigate = useNavigate();

  const updateMutation = useEditBooks();
  const { data } = useCategories();
  const { data: bookData, isLoading, isError } = useBookById(id as string);

  useEffect(() => {
    if (bookData) {
      setFormData({
        name: bookData.name,
        description: bookData.description,
        image: bookData.image,
        price: bookData.price,
        stock: bookData.stock,
        categoryId: bookData.categoryId,
      });
    }
  }, [bookData, data]);

  const [status, setStatus] = useState<{
    type: "Success" | "Error" | null;
    msg: string;
  }>({ type: null, msg: "" });

  const showAlert = (type: "Success" | "Error", msg: string) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus({ type: null, msg: "" }), 3000);
  };

  const handleButtonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate(
      { id: id as string, bookData: formData },
      {
        onSuccess: () => {
          navigate("/books");
          showAlert("Success", "successfully update this book");
        },
        onError: () => showAlert("Error", "Error Update this book"),
      },
    );
  };

  if (isError) return <div className="text-center">Failed Get data Book!</div>;

  return (

    
    <div
      className={clsx(
        "h-screen transition-all duration-300",
        isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28",
      )}
    >
      {status.type === "Success" && (
        <Alert
          variant="default"
          className="animate-fade-left-out bg-green-100 dark:bg-green-900/20 dark:text-green-400 border-green-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-green-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleCheckBig color="#4ade80" size={15} />
          <AlertTitle>Edit Successfull</AlertTitle>
          <AlertDescription>
            You have successfully edit a book.
          </AlertDescription>
        </Alert>
      )}
      {/* Error Alert */}
      {status.type === "Error" && (
        <Alert
          variant="destructive"
          className="animate-fade-left-out bg-red-100/85 dark:bg-red-900/45 dark:text-red-400 border-red-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-red-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleAlert color="#ef4444" size={15} />
          <AlertTitle>Error edit book</AlertTitle>
          <AlertDescription>please try again later.</AlertDescription>
        </Alert>
      )}
      <div className="lg:ml-5 px-6">
        <Link to="/books" className="relative top-9">
          <ArrowLeft size={35} />
        </Link>
        <h1 className="text-3xl pl-10">Edit Book.</h1>
        <AppBreadcrumb to="book/edit">Edit a book</AppBreadcrumb>
      </div>

      {/* Add Book Form */}
      <div className="w-[90%] ml-5 lg:ml-10 mt-8 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 lg:w-[50%]">
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Book Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="add book name..."
                    className=" dark:border-neutral-800 "
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    placeholder="add book description..."
                    className="dark:border-neutral-800"
                    area-invalid
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            {/* image url */}
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                <InputGroup className="dark:border-neutral-800 outline-none dark:bg-black">
                  <InputGroupInput
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.value,
                      })
                    }
                  />
                  <InputGroupAddon>url</InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldSet>

            {/* image input */}
            <FieldSet>
              <div className="grid grid-cols-2 space-x-2">
                <Field>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    type="number"
                    className="dark:border-neutral-800"
                    value={formData.stock}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        stock: Number(e.target.value),
                      });
                    }}
                  />
                </Field>

                {/* category input */}
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoryId: value })
                    }
                  >
                    <SelectTrigger className="dark:border-neutral-800">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id as string}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="Price">Price</FieldLabel>
                  <InputGroup className="dark:border-neutral-800 outline-none dark:bg-black">
                    <InputGroupInput
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                    <InputGroupAddon>IDR</InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button
                type="submit"
                onClick={handleButtonSubmit}
                variant={"primary"}
              >
                Submit
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
