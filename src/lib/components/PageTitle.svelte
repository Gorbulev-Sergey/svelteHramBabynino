<script lang="ts">
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { onMount, onDestroy } from 'svelte';

	interface IProps {
		title?: string;
	}

	let { title }: IProps = $props();

	onMount(() => {
		STORE.pageTitle = pageTitle;
	});
	onDestroy(() => {
		STORE.pageTitle = null;
	});
</script>

{#snippet pageTitle()}
	<div class="btn bg-transparent text-uppercase fw-bold px-3">
		{@html title}
	</div>
{/snippet}
