import { bookmarkSchema } from "$lib/zod/schemas/bookmarkSchema";
import type { Bookmark } from "../types/bookmark";
interface ZODField {
    [key: string]:string
}

export const validate = (e:Event)=> {
    const id:string = (e?.currentTarget as HTMLFormElement).id;
    const value = (e?.currentTarget as HTMLFormElement).value;
    const fieldObj:ZODField={};
    fieldObj[id]=value;
    const res = bookmarkSchema.safeParse(fieldObj)
    let fieldErrors:Array<string>| undefined 
    if (!res.success) {
        const formattedError= res.error.format();
        fieldErrors = formattedError[id as keyof Bookmark ]?._errors
        console.log("fieldErrors",fieldErrors)
        if(fieldErrors) {
            (e?.currentTarget as HTMLFormElement).setAttribute("aria-invalid", "true")
        }
        else (e?.currentTarget as HTMLFormElement).setAttribute("aria-invalid", "")
    }
    else (e?.currentTarget as HTMLFormElement).setAttribute("aria-invalid", "")
    return fieldErrors?.toString()
}

export const validateFormData = (formdata:any) =>{
    const validationResponse = bookmarkSchema.safeParse(formdata);
    const response={
        success:false,
        error:{},
    }
    if (!validationResponse.success) {
        const zodError = validationResponse.error.format();
        console.log("zodError", zodError)
        response.error = zodError;
    } else {
        response.success = true;
    }
    return response;
}