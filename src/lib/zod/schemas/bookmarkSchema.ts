import { z } from "zod";

export const bookmarkSchema = z.object({
    url: z.string().url({ message: "Invalid url"}).startsWith("https://",{message:"must be https..."}),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    description: z.string({
        required_error: "Description is required",
    }).min(3, {message: "Minimum 5 Characters..."})
})