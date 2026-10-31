<script lang="ts">
	import { getTags } from '#lib/remoutes/firebase.remote.ts';
	import Column from '#lib/components/Column.svelte';
	import { getPosts } from '#lib/remoutes/firebase.remote.ts';
	import SubPanel from '#lib/components/SubPanel.svelte';
	import PageTitle from '#lib/components/PageTitle.svelte';

	let posts = $derived(await getPosts());
</script>

<PageTitle>Главная страница</PageTitle>

<SubPanel>
	<div class="d-flex align-items-center gap-2 flex-wrap">
		{#each await getTags() as tag}
			<a class="badge bg-2 bg-70 rounded-3 px-1" href={'#' + tag.name}>
				#{tag.name}
			</a>
		{/each}
	</div>
</SubPanel>

<Column gap="7">
	<div class="d-flex align-items-center gap-2 flex-wrap">
		{#each [...Object.values(posts)].filter((p) => p.tags.some((t) => t.name === 'архив')) as post}
			<div class="btn btn-sm rounded-3">{post.title}</div>
		{/each}
	</div>
</Column>
