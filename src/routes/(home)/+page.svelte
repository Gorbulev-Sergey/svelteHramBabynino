<script lang="ts">
	import { getTags } from '#lib/remoutes/firebase.remote.ts';
	import Column from '#lib/components/Column.svelte';
	import { getPosts } from '#lib/remoutes/firebase.remote.ts';
	import Slot from '#lib/components/Slot.svelte';
	import BreadCrumb from '#lib/components/BreadCrumb.svelte';
	import { STORE } from '#lib/settings/store.svelte.ts';
	import Post from '#lib/components/posts/Post.svelte';
	import { Tag, type ITag } from '#lib/models/Tag.ts';

	let tags = $derived(getTags());
	let posts = $derived(getPosts());
	let selectedTag = $derived((await tags).find((t) => t.name === 'главное') || Tag());
	let pinnedPosts = $derived(
		[...Object.values(await posts)].filter(
			(p) => p.published && p.pinned && p.tags.some((t) => t.name === selectedTag.name)
		)
	);
	let filteredPosts = $derived(
		[...Object.values(await posts)].filter(
			(p) => p.published && !p.pinned && p.tags.some((t) => t.name === selectedTag.name)
		)
	);
	let routes = $derived([
		{ url: '/', title: 'Публикации' },
		{ url: '/', title: selectedTag.name }
	]);
</script>

<Slot title="breadCrumb" bind:storeSlot={STORE.panels.breadCrumb}>
	<BreadCrumb {routes} />
</Slot>

<Slot title="sub" bind:storeSlot={STORE.panels.sub}>
	<div class="d-flex align-items-center justify-content-start gap-2 flex-wrap">
		{#each await tags as tag}
			<button class="badge rounded-3 px-1" onclick={() => (selectedTag = tag)}>
				#{tag.name}
			</button>
		{/each}
	</div>
</Slot>

<Column gap="7">
	<div class="row row-cols-4 justify-content-center gx-4 gy-8">
		{#each pinnedPosts as post}
			<div class="col h-100">
				<Post {post} />
			</div>
		{/each}
	</div>
	<div class="row row-cols-4 justify-content-center gx-4 gy-8">
		{#each filteredPosts as post}
			<div class="col h-100">
				<Post {post} />
			</div>
		{/each}
	</div>
</Column>
