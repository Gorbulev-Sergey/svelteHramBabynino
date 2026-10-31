import type { Snippet } from 'svelte';

interface IStore {
	pageTitle: Snippet<[]> | null;
	subPanel: Snippet<[]> | null;
}

export const STORE = $state<IStore>({
	pageTitle: null,
	subPanel: null
});
