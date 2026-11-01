import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('session', {
		path: '/',
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	});

	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
