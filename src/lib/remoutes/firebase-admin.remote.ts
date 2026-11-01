import { adminAuth } from '#lib/settings/firebase-admin.ts';
import { command, getRequestEvent, query } from '$app/server';
import * as v from 'valibot';

export const logInSession = command(v.string(), async (idToken) => {
	const { cookies } = getRequestEvent();

	try {
		// Создаём session cookie на 5 дней
		const sessionCookie = await adminAuth.createSessionCookie(idToken, {
			expiresIn: 5 * 24 * 60 * 60 * 1000
		});

		cookies.set('session', sessionCookie, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 5 * 24 * 60 * 60
		});
	} catch {}
});

export const logOutSession = command(async () => {
	const { cookies } = getRequestEvent();
	try {
		cookies.delete('session', {
			path: '/',
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production'
		});
	} catch (error) {}
});
