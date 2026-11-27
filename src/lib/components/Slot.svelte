<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';

	interface IProps {
		title?: string;
		storeSlot?: Snippet<[]> | null;
		children?: Snippet<[]>;
	}
	let { title, storeSlot = $bindable(), children }: IProps = $props();
	onMount(() => {
		storeSlot = children;
	});
	onDestroy(() => {
		storeSlot = null;
	});
</script>
