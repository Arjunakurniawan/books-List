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
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";
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
import { editBook, getBookById } from "@/services/book";
import { getCategories } from "@/services/category";

export default function EditBookScreen() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  const { id } = useParams<{ id: string }>();

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategory(categoriesData);

        if (id) {
          const bookData = await getBookById(id as string);
          setFormData({
            name: bookData.name,
            description: bookData.description,
            image: bookData.image,
            price: bookData.price,
            stock: bookData.stock,
            categoryId: bookData.categoryId,
          });
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
        setError("Failed to fetch book data. Please try again.");
        setTimeout(() => setError(""), 3000);
      }
    };

    fetchBookData();
  }, [id]);

  const handleButtonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await editBook(id as string, {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        price: formData.price,
        stock: formData.stock,
        categoryId: formData.categoryId,
      });
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/books");
      }, 2000);
    } catch (error) {
      console.error("error creating", error);
      setError("Failed to create book. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div
      className={clsx(
        "h-screen transition-all duration-300 mt-12",
        isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28",
      )}
    >
      {success && (
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
      {error && (
        <Alert
          variant="destructive"
          className="animate-fade-left-out bg-red-100/85 dark:bg-red-900/45 dark:text-red-400 border-red-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-red-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleAlert color="#ef4444" size={15} />
          <AlertTitle>Error edit book</AlertTitle>
          <AlertDescription>please try again later.</AlertDescription>
        </Alert>
      )}
      <div className="pt-4">
        <Link to="/books" className="relative top-8 left-7">
          <ArrowLeft size={32} />
        </Link>
        <h1 className="text-4xl pl-20">Edit Book.</h1>
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
                      {category.map((cat) => (
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