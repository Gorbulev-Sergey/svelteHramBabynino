<script lang="ts">
	import { getTags } from '#lib/remoutes/firebase.remote.ts';
	import Column from '#lib/components/Column.svelte';
	import { getPosts } from '#lib/remoutes/firebase.remote.ts';
	import SubPanel from '#lib/components/SubPanel.svelte';
	import PageTitle from '#lib/components/PageTitle.svelte';

	let tags = $derived(await getTags());
	let posts = $derived(await getPosts());
	let selectedTag = $state(tags.find((t) => t.name === 'главное'));
	let filteredPosts = $derived(
		[...Object.values(posts)].filter(
			(p) => p.published && !p.pinned && p.tags.some((t) => t.name === selectedTag.name)
		)
	);
</script>

<PageTitle>Главная страница</PageTitle>

<SubPanel>
	<div class="d-flex align-items-center gap-2 flex-wrap">
		{#each tags as tag}
			<button class="badge rounded-3 px-1" onclick={() => (selectedTag = tag)}>
				#{tag.name}
			</button>
		{/each}
	</div>
</SubPanel>

<Column gap="7">
	<div class="row row-cols-4 justify-content-center gx-4 gy-8">
		{#each filteredPosts as post}
			<div class="col h-100">
				<div class="d-flex flex-column gap-1">
					<div class="d-flex align-items-center justify-content-between">
						<small class="fw-bold">
							{new Date(post.created).toLocaleDateString('ru-Ru', { dateStyle: 'long' })}
						</small>
						<div>
							<button class="badge rounded-3 fw-bold px-1">#{post?.tags?.length}</button>
						</div>
					</div>
					{#if post?.cover?.video}
						{#if post.cover.video?.includes('https://rutube.ru')}
							<iframe
								title=""
								class="w-100 ratio-16x9 rounded-3"
								src={post.cover.video.replace('/video/', '/play/embed/')}
							></iframe>
						{/if}
						{#if post.cover.video?.includes('https://youtu.be')}
							<iframe
								title=""
								class="w-100 ratio-16x9 rounded-3"
								src={post.cover.video.replace('/youtu.be/', '/www.youtube.com/embed/')}
							></iframe>
						{/if}
						{#if post.cover.video?.includes('https://vkvideo.ru')}
							<iframe
								title=""
								class="w-100 ratio-16x9 rounded-3"
								src={post.cover.video
									.replace('vkvideo.ru/video', 'vkvideo.ru/videoext.php?oid=')
									.replace('_', '&id=')
									.replace('videoext', 'video_ext')}
							></iframe>
						{/if}
						{#if post.cover.video?.includes('https://vk.com')}
							<iframe title="" class="w-100 ratio-16x9 rounded-3" src={post.cover.video}></iframe>
						{/if}
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
