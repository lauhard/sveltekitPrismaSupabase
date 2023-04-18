import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { bookmarkSchema } from "$lib/zod/schemas/bookmarkSchema";
import { PrismaClient, type bookmark } from '@prisma/client';

export const load: PageServerLoad = async (event) => {
    // console.log("PageServerLoad",event)
    console.log("loading bookmarks with prisma client...")

    const client = new PrismaClient();
    const bookmarks:Array<bookmark> = await client.bookmark.findMany();
    console.log("bookmarks", bookmarks)
    return {
        bookmarks
    }
    
}

export const actions: Actions = {
    add: async ({request}):Promise<any> => {
        console.log("hit action")
       
        const formdata =  Object.fromEntries(( await request.formData()))
        const validationResponse = bookmarkSchema.safeParse(formdata);
        const response={
            success:false,
            error:{}
        }
        if (!validationResponse.success) {
            const zodError = validationResponse.error.format();
            // console.log("zodError", zodError)
            response.error = zodError;
        } else {
            response.success = true;
        }
        return response
    }
};