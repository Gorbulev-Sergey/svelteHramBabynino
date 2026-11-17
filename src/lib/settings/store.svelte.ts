import type { Snippet } from 'svelte';

interface IStore {
	pageTitle: Snippet<[]> | null;
	subPanel: Snippet<[]> | null;
	ADMIN: {
		sidebar: {
			width?: number;
			height?: number;
			isOpen?: boolean;
		};
	};
}

export const STORE = $state<IStore>({
	pageTitle: null,
	subPanel: null,
	ADMIN: {
		sidebar: { width: 0, height: 100, isOpen: true }
	}
});
