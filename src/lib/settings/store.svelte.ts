import type { Snippet } from 'svelte';

interface IStore {
	page: {
		title: Snippet<[]> | null;
		breadCrumb: Snippet<[]> | null;
		mediumPanel: Snippet<[]> | null;
		menu: Snippet<[]> | null;
		subPanel: Snippet<[]> | null;
		footer: Snippet<[]> | null;
	};
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
		sidebar: {
			width: 0,
			height: 100,
			isOpen: true
		}
	},
	page: {
		title: null,
		subPanel: null,
		menu: null,
		footer: null,
		breadCrumb: null,
		mediumPanel: null
	}
});
