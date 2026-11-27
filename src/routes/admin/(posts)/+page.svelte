<script lang="ts">
	import BreadCrumb from '#lib/components/BreadCrumb.svelte';
	import Slot from '#lib/components/Slot.svelte';
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

	let routes = $derived([
		{ url: '/', title: 'Публикации' },
		{ url: '/', title: selectedTag.name }
	]);
</script>

<Slot title="breadCrumb" bind:storeSlot={STORE.panels.breadCrumb}>
	<BreadCrumb {routes} hasStartArrow={false} />
</Slot>

<Slot title="medium" bind:storeSlot={STORE.panels.medium}>
	<div class="d-flex align-items-center justify-content-end gap-1">
		<button class="btn btn-sm rounded-3">Создать</button>
	</div>
</Slot>

<Slot title="sub" bind:storeSlot={STORE.panels.sub}>
	<div class="d-flex align-items-center justify-content-start flex-wrap gap-1">
		{#each await tags as tag}
			<button class="badge rounded-3 px-1" onclick={() => (selectedTag = tag)}>
				#{tag.name}
			</button>
		{/each}
	</div>
</Slot>

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
