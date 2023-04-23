import { PrismaClient } from "@prisma/client";

//NOTE: beacuse of hot reloading files in development we create a global variable to store prisma client
const primsa = global.prisma || new PrismaClient();

if( process.env.NODE_ENV === 'development') {
    global.prisma = primsa
}

export default prisma 