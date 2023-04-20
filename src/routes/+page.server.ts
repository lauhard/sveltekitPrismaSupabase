import type { PageServerLoad } from "./$types";
import { bookmarkSchema } from "$lib/zod/schemas/bookmarkSchema";
import { Prisma, PrismaClient, type bookmark } from '@prisma/client';
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    // console.log("PageServerLoad",event)
    console.log("loading bookmarks with prisma client...")

    const client = new PrismaClient();
    const bookmarks:Array<bookmark> = await client.bookmark.findMany();
    console.log("bookmarks-", bookmarks)
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
            error:{},
            prismaError:""
        }
        if (!validationResponse.success) {
            const zodError = validationResponse.error.format();
            // console.log("zodError", zodError)
            response.error = zodError;
        } else {
            const client = new PrismaClient();
            try {
                await client.bookmark.create({
                    data:{
                        url:formdata.url.toString(),
                        name:formdata.name.toString(),
                        description:formdata.description.toString()
                    }
        
                })
                response.success = true;
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    console.log("error.code", error.message.split('invocation:')[1])
                    response.prismaError = error.message.split('invocation:')[1];
                }
                response.success = false;
            }
        }
        return response
    }
};