import { Prisma, type bookmark } from '@prisma/client';
import prisma from "$lib/server/prisma";

interface BookmarkResponse {
    success:boolean,
    prismaError:string,
    data?:Array<bookmark> | bookmark | string | number
}

export const getBookmarks = async () =>{
    const response:BookmarkResponse = {
        success:false,
        prismaError:"",
        data:[]
    }
    try {
        const bookmarks:Array<bookmark> = await prisma.bookmark.findMany();
        response.data=bookmarks;
        response.success=true; 
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("error:", `${error.code}: ${error.message}`)
            response.prismaError = error.message.split('invocation:')[1];
        }
    }
    return response;
}

export const createBookmarks = async (bookmark:any) => {
    const response: BookmarkResponse = {
        success:false,
        prismaError:"",
        data:NaN
    }

    try {
        const {id} = await prisma.bookmark.create({data:{
            ...bookmark
        }})
        response.success=true,
        response.data=id; 
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("error:", `${error.code}: ${error.message}`)
            response.prismaError = error.message.split('invocation:')[1];
        }
    }
    return response;
}

export const deleteBookmark = async (idx:string) => {
    const response: BookmarkResponse = {
        success:false,
        prismaError:"",
        data:0,
    }
    try {
        await prisma.bookmark.delete({
            where: {id:Number(idx)}
        })
        response.success=true;
        response.data=idx;

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("error:", `${error.code}: ${error.message}`)
            response.prismaError = error.message.split('invocation:')[1];
        }
    }
    return response;
}