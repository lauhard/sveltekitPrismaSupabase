import { applyAction } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import type { ActionResult } from "@sveltejs/kit";

export const formAction = ({form, data, action, cancel, submitter }: any, callback?: (arg0: string, arg1: { result: any; }) => void)=>{
    return async (action: { result: ActionResult<Record<string, any>, Record<string, any>>; }) =>{
        const result = action.result as ActionResult<Record<string, any>, Record<string, any>>
        const isValid = result.type

        console.log("isvalid", isValid)
        if(isValid==="success" ) {
            if(result?.data?.success) {
                form.reset();
                await invalidateAll() // run all load functions

            }
            // console.log("result.data",result.data)
            await applyAction(result) // pass form data
            // await applyAction(result)
            
        }
        if(typeof(callback) == "function")
            callback("formaction", {"result": result})
    }
}

