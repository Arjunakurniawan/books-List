import * as z from "zod";

export const FormBookSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image URL is required").url("Invalid URL format"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  stock: z.coerce.number().min(1, "Stock must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
});

export const FormBookUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image URL is required").url("Invalid URL format"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  stock: z.coerce.number().min(1, "Stock must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
});

export const CategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type FormBookInput = z.input<typeof FormBookSchema>;
export type FormBookOutput = z.infer<typeof FormBookSchema>;
export type FormBookUpdateInput = z.input<typeof FormBookUpdateSchema>;
export type FormBookUpdateOutput = z.infer<typeof FormBookUpdateSchema>;
