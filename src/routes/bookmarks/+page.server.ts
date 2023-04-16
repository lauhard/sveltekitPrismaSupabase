import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { bookmarkSchema } from "$lib/zod/schemas/bookmarkSchema";

export const load: PageServerLoad = async (event) => {
    console.log("PageServerLoad",event)
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