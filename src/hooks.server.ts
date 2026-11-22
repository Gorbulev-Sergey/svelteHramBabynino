import { adminAuth } from '#lib/settings/firebase-admin.ts';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('session') || '';
	event.locals.user = null;

	if (sessionCookie) {
		try {
			const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
			event.locals.user = {
				uid: decoded.uid,
				email: decoded.email,
				name: decoded.name,
				picture: decoded.picture,
				role: decoded.role
			};
		} catch {
			// Кука невалидна — пользователь не авторизован
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
};
