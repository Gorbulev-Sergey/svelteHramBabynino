<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';

	interface IProps {
		title?: string;
		storeItem?: Snippet<[]> | null;
		children?: Snippet<[]>;
	}
	let { title, storeItem = $bindable(), children }: IProps = $props();
	onMount(() => {
		storeItem = children;
	});
	onDestroy(() => {
		storeItem = null;
	});
</script>
