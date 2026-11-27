<script lang="ts">
	import BreadCrumb from '#lib/components/BreadCrumb.svelte';
	import Maket from '#lib/components/Maket.svelte';

	let { data } = $props();
</script>

<Maket {data}>
	{#snippet breadCrumb()}
		<BreadCrumb routes={[{ url: '/schedule', title: 'Расписание' }]} />
	{/snippet}
</Maket>
