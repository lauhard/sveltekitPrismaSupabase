import { bookmarkSchema } from "$lib/zod/schemas/bookmarkSchema";
interface ZODField {
    [key: string]:string
}
interface Bookmark {
    url:string,
    name:string,
    description:string
}
export const validate = (e:Event)=> {
    const id:string = (e?.currentTarget as HTMLFormElement).id;
    const value = (e?.currentTarget as HTMLFormElement).value;
    const fieldObj:ZODField={};
    fieldObj[id]=value;
    const res = bookmarkSchema.safeParse(fieldObj)
    if (!res.success) {
        const formattedError= res.error.format();
        const fieldErrors: Array<string> | undefined = formattedError[id as keyof Bookmark]?._errors
        console.log("fieldErrors",fieldErrors)
        if(fieldErrors) {
            (e?.currentTarget as HTMLFormElement).setAttribute("aria-invalid", "true")
        }
        else (e?.currentTarget as HTMLFormElement).setAttribute("aria-invalid", "")
    }
    else (e?.currentTarget as HTMLFormElement).setAttribute("aria-invalid", "")
}