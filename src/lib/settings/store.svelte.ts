import { getContext, setContext, type Snippet } from 'svelte';

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
	panels: {
		breadCrumb?: () => ReturnType<import('svelte').Snippet>;
		medium?: () => ReturnType<import('svelte').Snippet>;
		nav?: {
			main?: () => ReturnType<import('svelte').Snippet>;
			add?: () => ReturnType<import('svelte').Snippet>;
		};
		sub?: () => ReturnType<import('svelte').Snippet>;
		footer?: () => ReturnType<import('svelte').Snippet>;
	};
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
	},
	panels: {}
});

export function initSlots() {
	return setContext('slots', STORE?.panels);
}

export function setSlots(slots: object) {
	STORE.panels = slots;
	const context = getContext('slots') as object;
	Object.assign(context, STORE.panels);
}
