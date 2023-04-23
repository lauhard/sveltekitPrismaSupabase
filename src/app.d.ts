// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	// NOTE: to get around multiple prisma clients we store the client connection globally
	// eslint-disable-next-line no-var
	var prisma: PrismaClient
}

export {};
