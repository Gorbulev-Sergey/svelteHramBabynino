import { STORE } from '#lib/settings/store.svelte.ts';
import { browser } from '$app/env';
import type { HandleClientError } from '@sveltejs/kit/hooks';

export const handleClientError: HandleClientError = async () => {};

if (browser) {
	// Работаем с темой
	const defaultTheme = 'light';
	let theme = (await cookieStore.get('theme'))?.value;
	if (!theme) await cookieStore.set('theme', defaultTheme);
	document.querySelector('[data-bs-theme]')?.setAttribute('data-bs-theme', theme || defaultTheme);

	// Работаем с админ панелью
	let isOpen = (await cookieStore.get('sidebar'))?.value;
	if (!isOpen) await cookieStore.set('sidebar', String(true));
	STORE.ADMIN.sidebar.isOpen = Boolean(isOpen);
}
