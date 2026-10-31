import { db } from '#lib/settings/firebase.ts';
import type { Handle } from '@sveltejs/kit/hooks';
import { get, ref } from 'firebase/database';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = { name: 'Сержик', role: 'admin' };
	// event.locals.tags = await (await get(ref(db, '/tags'))).val();

	const response = await resolve(event);
	return response;
};
