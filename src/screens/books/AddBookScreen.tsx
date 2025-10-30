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
import { SlashIcon, ArrowLeft, ImageUp } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
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
import { useEffect, useState } from "react";
import { getCategories } from "@/services/category";
import type { CategoryResponse } from "@/types/ApiResponse.type";

export default function AddBookScreen() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  const [category, setCategory] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategory(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return month;
  });

  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const endYear = currentYear + 5;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, "0");
    return day;
  });

  return (
    <div
      className={clsx(
        "h-screen transition-all duration-300 mt-12",
        isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28"
      )}
    >
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
      <div className="w-[200%] ml-8 mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Book Name</FieldLabel>
                  <Input type="text" placeholder="add book name..." />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    placeholder="add book description..."
                    area-invalid
                  />
                </Field>
                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel htmlFor="checkout-exp-month-ts6">
                      Month
                    </FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="checkout-exp-month-ts6">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                      Day
                    </FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="checkout-7j9-exp-year-f59">
                        <SelectValue placeholder="DD" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                      Year
                    </FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="checkout-7j9-exp-year-f59">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Upload image</FieldLegend>
              <FieldGroup className="relative border-dashed border-2 border-neutral-300 dark:border-neutral-700 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
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
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="Stock">Stock</FieldLabel>
                  <Input type="text" placeholder="0" />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Category</FieldLabel>
                <Select>
                  <SelectTrigger>
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
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="Price">Price</FieldLabel>
                  <InputGroup>
                    <InputGroupInput placeholder="0" />
                    <InputGroupAddon>IDR</InputGroupAddon>
                    <InputGroupAddon align="inline-end"></InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">Submit</Button>
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
