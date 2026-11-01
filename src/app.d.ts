import type { TRole } from '#lib/models/Role.ts';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				uid?: string;
				email?: string;
				name?: string;
				picture?: string | null;
				role?: TRole | null;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
