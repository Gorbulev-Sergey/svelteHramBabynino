<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import StoreSnippet from '#lib/components/StoreSnippet.svelte';
	import SubPanel from '#lib/components/SubPanel.svelte';
	import { getPosts, getTags } from '#lib/remoutes/firebase.remote.ts';
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { Table } from '@gorbulevsv/table';

	let posts = $derived(getPosts());
	let tags = $derived(getTags());

	let selectedTag = $derived((await tags).find((t) => t.name === 'главное'));
	let filteredPosts = $derived(
		[...Object.values(await posts)].filter(
			(p) => p.published && !p.pinned && p.tags.some((t) => t.name === selectedTag.name)
		)
	);
	let data = $derived(
		filteredPosts.map((p) => {
			let { created, title, description, userName } = p as {
				created: string;
				title: string;
				description: string;
				userName?: string;
			};
			return {
				Заголовок: `<b class='text-uppercase'>${title}</b>`,
				Описание: description,
				Дата: new Date(created).toLocaleDateString(),
				Пользователь: userName || ''
			};
		})
	);
</script>

<StoreSnippet title="Хлебные крошки" bind:storeItem={STORE.page.breadCrumb}>
	<div class="d-flex align-items-center gap-1">
		<div class="rounded-3 px-2">Публикации</div>
		<div>
			<i class="bi bi-chevron-right"></i>
		</div>
		<div class="bg-3 rounded-3 px-2">{selectedTag.name}</div>
	</div>
</StoreSnippet>

<StoreSnippet title="Средняя панель" bind:storeItem={STORE.page.mediumPanel}>
	<div class="d-flex align-items-center justify-content-end gap-1">
		<button class="btn btn-sm rounded-3">Создать</button>
	</div>
</StoreSnippet>

<StoreSnippet title="SubPanel" bind:storeItem={STORE.page.subPanel}>
	<div class="d-flex align-items-center justify-content-start flex-wrap gap-1">
		{#each await tags as tag}
			<button class="badge rounded-3 px-1" onclick={() => (selectedTag = tag)}>
				#{tag.name}
			</button>
		{/each}
	</div>
</StoreSnippet>

<div class="row row-cols-1 g-2" hidden>
	{#each filteredPosts as item}
		<div class="col h-100">
			<div class="d-flex gap-5 bg-1 rounded-3 px-2 py-1">
				<div>{new Date(item.created).toLocaleDateString()}</div>
				<div class="vr"></div>
				<div class="flex-grow-1 d-flex align-items-center gap-5 justify-content-between">
					<div class=" text-uppercase">{@html item.title}</div>
					<div>{@html item.description}</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<Table {data} grows={[5, 6, 2, 2]} _class={{ row: 'align-items-top bg-1' }} />
