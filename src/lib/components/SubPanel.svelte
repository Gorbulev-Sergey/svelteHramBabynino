<script lang="ts">
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { onMount, onDestroy, type Snippet } from 'svelte';

	let { children } = $props();
	onMount(() => {
		STORE.subPanel = children;
	});
	onDestroy(() => {
		STORE.subPanel = null;
	});
</script>
