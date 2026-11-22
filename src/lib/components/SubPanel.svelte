<script lang="ts">
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { onMount, onDestroy } from 'svelte';

	let { children } = $props();
	onMount(() => {
		STORE.page.subPanel = children;
	});
	onDestroy(() => {
		STORE.page.subPanel = null;
	});
</script>
