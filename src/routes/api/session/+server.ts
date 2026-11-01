import { adminAuth } from '#lib/settings/firebase-admin.ts';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { idToken } = await request.json();

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

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}
};
