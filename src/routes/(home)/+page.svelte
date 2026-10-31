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
			<a class="badge rounded-3 px-1" href={'#' + tag.name}>
				#{tag.name}
			</a>
		{/each}
	</div>
</SubPanel>

<Column gap="7">
	<div class="row row-cols-4 justify-content-center g-4">
		{#each [...Object.values(posts)].filter((p) => p.published && !p.pinned && p.tags.some((t) => t.name === 'главное')) as post}
			<div class="col">
				<div class="d-flex flex-column gap-1">
					<div class="d-flex align-items-center justify-content-between">
						<div>{new Date(post.created).toLocaleDateString('ru-Ru', { dateStyle: 'long' })}</div>
						<div>
							<button class="badge rounded-3 fw-bold px-1">#{post?.tags?.length}</button>
						</div>
					</div>
					{#if post?.cover?.video?.includes('https://rutube.ru')}
						<iframe
							title=""
							class="w-100 ratio-16x9 rounded-3"
							src={post?.cover?.video?.replace('/video/', '/play/embed/')}
						></iframe>
					{/if}
					<div class="d-flex flex-column">
						<div class="text-uppercase fw-bold">{@html post?.title}</div>
						<div class="">{@html post?.description}</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Column>
