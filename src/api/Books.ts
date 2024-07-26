import { z } from "zod";

const API_URL = "http://localhost:7529";

export const BookSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  data: z.string().optional(),
  price: z.number().optional(),
  tags: z.array(z.string()).optional(),
  illustrator: z.string().optional(),
});
export type Book = z.infer<typeof BookSchema>;

export const BookListSchema = z.array(BookSchema);
export type BookList = z.infer<typeof BookListSchema>;

export async function getBook() {
  return fetch(`${API_URL}/books`)
    .then((response) => response.json())
    .then((data) => BookListSchema.parse(data))
    .catch((error) => {
      console.log("getBook error", error.message);
      throw error.message;
    });
}
