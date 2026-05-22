import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import { ArrowLeft, CircleCheckBig, CircleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AppBreadcrumb from "@/components/common/AppBreadcrumb";
import { useCreateBooks } from "@/hooks/books/useBooks";
import { useCategories } from "@/hooks/categories/useCategories";

export default function AddBookScreen() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    categoryId: "",
  });

  const [status, setStatus] = useState<{
    type: "Success" | "Error" | null;
    msg: string;
  }>({ type: null, msg: "" });

  const { data } = useCategories();
  const createMutation = useCreateBooks();
  const navigate = useNavigate();

  const showAlert = (type: "Success" | "Error", msg: string) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus({ type: null, msg: "" }), 3000);
  };

  const handleButtonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createMutation.mutate(
      {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        price: formData.price,
        stock: formData.stock,
        categoryId: formData.categoryId,
      },
      {
        onSuccess: () => {
          (showAlert("Success", "Book created successfully"),
            navigate("/books"));
        },
        onError: () => showAlert("Error", "Error created books"),
      },
    );
  };

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
          <AlertTitle>{status.type}</AlertTitle>
          <AlertDescription>{status.msg}</AlertDescription>
        </Alert>
      )}
      {/* Error Alert */}
      {status.type === "Error" && (
        <Alert
          variant="destructive"
          className="animate-fade-left-out bg-red-100/85 dark:bg-red-900/45 dark:text-red-400 border-red-600 border-l-4 border-t-0 border-b-0 border-r-0 mb-4 text-red-600 fixed top-4 right-4 z-[9999] w-80"
        >
          <CircleAlert color="#ef4444" size={15} />
          <AlertTitle>{status.type}</AlertTitle>
          <AlertDescription>{status.msg}</AlertDescription>
        </Alert>
      )}

      <div className="lg:ml-5 px-6">
        <Link to="/books" className="relative top-9">
          <ArrowLeft
            size={35}
            className="hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-all duration-300 "
          />
        </Link>
        <h1 className="text-3xl pl-10">Add a new Book.</h1>
        <AppBreadcrumb to="book/create">Add a book</AppBreadcrumb>
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

            <FieldSet>
              <div className="grid grid-cols-2 space-x-1">
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

                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoryId: value })
                    }
                  >
                    <SelectTrigger className="dark:border-neutral-800">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id as string}
                        >
                          {category.name}
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
