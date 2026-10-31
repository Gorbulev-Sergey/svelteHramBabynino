import { browser } from '$app/env';
import type { HandleClientError } from '@sveltejs/kit/hooks';

export const handleClientError: HandleClientError = async () => {};

if (browser) {
	const defaultTheme = 'light';
	let theme = (await cookieStore.get('theme'))?.value;
	if (!theme) {
		cookieStore.set('theme', defaultTheme);
	}
	document.querySelector('[data-bs-theme]')?.setAttribute('data-bs-theme', theme || defaultTheme);
}
