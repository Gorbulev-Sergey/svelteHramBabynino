import { getContext, setContext, type Snippet } from 'svelte';

interface IStore {
	// panels: Record<string, () => ReturnType<import('svelte').Snippet>>;
	panels: {
		breadCrumb: Snippet<[]> | null;
		medium: Snippet<[]> | null;
		mainNav: Snippet<[]> | null;
		addNav: Snippet<[]> | null;
		sub: Snippet<[]> | null;
		footer: Snippet<[]> | null;
	};
	ADMIN: {
		sidebar: {
			width?: number;
			height?: number;
			isOpen?: boolean;
		};
	};
}

export let STORE = $state<IStore>({
	ADMIN: {
		sidebar: {
			width: 0,
			height: 100,
			isOpen: true
		}
	},
	panels: {
		breadCrumb: null,
		medium: null,
		mainNav: null,
		addNav: null,
		sub: null,
		footer: null
	}
});

export function initSlots() {
	return setContext('slots', STORE.panels);
}
export function setSlots(snippets: Record<string, () => ReturnType<import('svelte').Snippet>>) {
	let context = getContext('slots') || setContext('slots', STORE.panels);

	Object.assign(STORE.panels, snippets);
	Object.assign(context, snippets);
}
