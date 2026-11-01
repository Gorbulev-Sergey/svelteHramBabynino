import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (locals.user?.role != 'admin') redirect(301, '/');
}
