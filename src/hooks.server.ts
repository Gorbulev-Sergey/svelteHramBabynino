import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = { name: 'Сержик', role: 'admin' };

	const response = await resolve(event);
	return response;
};
