<script lang="ts">
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { onMount, onDestroy, type Snippet } from 'svelte';

	let { children } = $props();
	onMount(() => {
		STORE.pageTitle = children;
	});
	onDestroy(() => {
		STORE.pageTitle = null;
	});
</script>
