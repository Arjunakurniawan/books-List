import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import {
  SlashIcon,
  ArrowLeft,
  ImageUp,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
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
import { getCategories } from "@/services/category";
import type { BookResponse, CategoryResponse } from "@/types/ApiResponse.type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createBook } from "@/services/book";

export default function AddBookScreen() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  const [category, setCategory] = useState<CategoryResponse[]>([]);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    categoryId: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategory(response);
      } catch (error) {
        setError("Failed Creating Book");
        console.error("Error Creating Book:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleButtonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!formData.name.trim()) {
      setError("Book name is required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!formData.categoryId) {
      setError("Category is required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await createBook(formData);
      setSuccess(true);

      setFormData({
        name: "",
        description: "",
        image: "",
        price: 0,
        stock: 0,
        categoryId: "",
      });

      setTimeout(() => {
        setSuccess(false);
        // Optional: navigate("/books")
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to create book. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div
      className={clsx(
        "h-screen transition-all duration-300 mt-12",
        isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28"
      )}
    >
      {success && (
        <Alert
          variant="default"
          className="animate-fade-left-out bg-green-100 dark:bg-green-900/20 dark:text-green-400 border-green-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-green-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleCheckBig color="#4ade80" size={15} />
          <AlertTitle>Book Created Successfully</AlertTitle>
          <AlertDescription>
            You have successfully created a new book.
          </AlertDescription>
        </Alert>
      )}
      {/* Error Alert */}
      {error && (
        <Alert
          variant="destructive"
          className="animate-fade-left-out bg-red-100/85 dark:bg-red-900/45 dark:text-red-400 border-red-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-red-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleAlert color="#ef4444" size={15} />
          <AlertTitle>Error Creating Book</AlertTitle>
          <AlertDescription>
            please check your input and try again.
          </AlertDescription>
        </Alert>
      )}
      <div className="pt-4">
        <Link to="/books" className="relative top-8 left-7">
          <ArrowLeft size={32} />
        </Link>
        <h1 className="text-4xl pl-20">New Book.</h1>
        <Breadcrumb className="pt-8 pl-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/books">Books</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/book/create">New Book</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Add Book Form */}
      <div className="w-[200%] ml-8 mt-8 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
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
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    placeholder="add book description..."
                    className="dark:border-neutral-800"
                    area-invalid
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldLegend>Upload image</FieldLegend>
              <FieldGroup className="relative border-dashed border-2 border-neutral-300 dark:border-neutral-800 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                <div className="text-center pointer-events-none">
                  <ImageUp className="mx-auto mb-2" />
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    .png, .jpg up to 10MB
                  </p>
                </div>
                <Input
                  type="file"
                  className="pointer absolute opacity-0 top-0 left-0 h-full w-full"
                />
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <div className="grid grid-cols-2 space-x-2">
                <Field>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    type="text"
                    placeholder="0"
                    className="dark:border-neutral-800"
                  />
                </Field>

                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select>
                    <SelectTrigger className="dark:border-neutral-800">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {category.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
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
                    <InputGroupInput placeholder="0" />
                    <InputGroupAddon>IDR</InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button onClick={handleButtonSubmit} variant={"primary"}>
                Submit
              </Button>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
