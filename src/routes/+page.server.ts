import type { PageServerLoad } from "./$types";
import { createBookmarks, deleteBookmark, getBookmarks } from "$lib/server/prisma/bookmarks/api";
import type { bookmark } from "@prisma/client";
import { validateFormData } from "$lib/zod/helper/forms";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    console.log("loading bookmarks with prisma client...")
    const response = await getBookmarks();
    const bookmarks = response.data as Array<bookmark>
    return {
        bookmarks
    }
}

export const actions: Actions = {
    add: async ({request}):Promise<any> => {
        console.log("hit action add:")
        const formdata =  Object.fromEntries(( await request.formData()))
        const validationResponse = validateFormData(formdata);
        const response={
            success:false,
            zodError:{},
            prismaError:""
        }
        if (!validationResponse.success) response.zodError = validationResponse.error;
        else {
            const {success, prismaError} = 
            await createBookmarks({
                url: formdata.url.toString(),
                name: formdata.name.toString(),
                description: formdata.description.toString(),
            })
            if(!success) response.prismaError = prismaError;
            else response.success = true;
        }
        return response
    },
    del: async ({request}):Promise<any> => {
        const formData = await request.formData();
        const id = formData.get("id")?.toString() || "0";
        console.log("bookmark deleted: id ", id)
        const response={
            success:false,
            zodError:{},
            prismaError:"",
            data:0
        } 
        const { success, prismaError, data } = await deleteBookmark(id);
        response.data = data as number;
        if(!success) response.prismaError = prismaError;
        else response.success = true;
        return response
    },
    update: async ({request}):Promise<any> => {
        const formData = await request.formData();
        const id = formData.get("id")?.toString() || "0";
        console.log("test ", id)
        const response={
            success:false,
            zodError:{},
            prismaError:"",
            data:"test"+id
        } 
   
       
        response.success = true;
        return response
    }
};