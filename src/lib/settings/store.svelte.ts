import type { Snippet } from 'svelte';

interface IStore {
	pageTitle: Snippet<[]> | null;
}

export const STORE = $state<IStore>({ pageTitle: null });
