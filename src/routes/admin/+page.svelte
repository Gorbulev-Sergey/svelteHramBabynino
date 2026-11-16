<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import { db } from '#lib/settings/firebase.ts';
	import { Table } from '@gorbulevsv/table';
	import { onValue, ref } from 'firebase/database';
	import { onMount } from 'svelte';

	let posts = $state<Record<string, any>>();
	let glavnoe = $derived(
		Object.values(posts || []).filter(
			(p) => p.published && p.tags.some((t) => t.name === 'о нашем храме')
		)
	);

	onMount(async () => {
		onValue(ref(db, 'posts'), (r) => {
			if (r.exists()) posts = r.val();
		});
	});

	$inspect(glavnoe);
</script>

<PageTitle>
	<div class="d-flex align-items-center gap-3">
		<div>Панель администратора</div>
		<div>
			<i class="bi bi-chevron-right"></i>
		</div>
		<div class="bg-3 rounded-3 px-2">Публикации</div>
	</div>
</PageTitle>

{#if posts}
	<div class="row row-cols-1 g-2">
		{#each glavnoe as item}
			<div class="col h-100">
				<div class="d-flex gap-5 bg-1 rounded-3 px-2 py-1">
					<div>{new Date(item.created).toLocaleDateString()}</div>
					<div class="vr"></div>
					<div>{@html item.title}</div>
					<div class="vr"></div>
					<div>{@html item.description}</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
