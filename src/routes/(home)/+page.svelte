<script lang="ts">
	import { getTags } from '#lib/remoutes/firebase.remote.ts';
	import Column from '#lib/components/Column.svelte';
	import { getPosts } from '#lib/remoutes/firebase.remote.ts';
	import BreadCrumb from '#lib/components/BreadCrumb.svelte';
	import Post from '#lib/components/posts/Post.svelte';
	import { Tag, type ITag } from '#lib/models/Tag.ts';
	import Maket from '#lib/components/Maket.svelte';

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

	let { data } = $props();
</script>

<Maket {data}>
	{#snippet breadCrumb()}
		<BreadCrumb {routes} />
	{/snippet}
	{#snippet sub()}
		<div class="d-flex align-items-center justify-content-start gap-1 flex-wrap">
			{#each await tags as tag}
				<button
					class="badge btn btn-xs fw-medium border-0 {selectedTag.name === tag.name
						? 'bg-3 fw-bold'
						: 'light'} rounded-3 px-2 py-0"
					onclick={() => (selectedTag = tag)}
				>
					#{tag.name}
				</button>
			{/each}
		</div>
	{/snippet}

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
</Maket>
