<script lang="ts">
	import { Post, type IPost } from '#lib/models/Post.ts';
	import type { Snippet } from 'svelte';

	interface Props {
		uid?: string;
		post?: IPost;
		_class?: string;
		_style?: string;
		children?: Snippet;
		isTagsShow?: boolean;
		subtitle?: Snippet;
	}
	let {
		uid = '',
		post = Post(),
		_class = '',
		_style = '',
		children,
		isTagsShow = true,
		subtitle
	}: Props = $props();

	let postColors = $derived(
		post.inverted
			? 'theme-inverse   px-4 pt-2 pb-4'
			: post.background
				? `bg-${post.background} bg-20 px-4 pt-2 pb-4`
				: ''
	);
</script>

<div class="d-flex flex-column gap-1 rounded-3 {postColors}">
	<div class="d-flex align-items-center">
		<div class="flex-grow-1 d-flex align-items-center gap-2">
			{#if post.pinned}
				<i class="bi bi-pin-angle-fill"></i>
			{/if}
			<small class="fw-bold">
				{new Date(post.created).toLocaleDateString('ru-Ru', { dateStyle: 'long' })}
			</small>
		</div>

		<button class="badge fg-1 rounded-3 fw-bold px-1">#{post?.tags?.length}</button>
	</div>
	{#if post?.cover?.video}
		{#if post.cover.video?.includes('https://rutube.ru')}
			<iframe
				title=""
				class="w-100 ratio-16x9 rounded-3 border-0"
				src={post.cover.video.replace('/video/', '/play/embed/')}
				allowfullscreen
			></iframe>
		{/if}
		{#if post.cover.video?.includes('https://youtu.be')}
			<iframe
				title=""
				class="w-100 ratio-16x9 rounded-3 border-0"
				src={post.cover.video.replace('/youtu.be/', '/www.youtube.com/embed/')}
				allowfullscreen
			></iframe>
		{/if}
		{#if post.cover.video?.includes('https://vkvideo.ru')}
			<iframe
				title=""
				class="w-100 ratio-16x9 rounded-3 border-0"
				src={post.cover.video
					.replace('vkvideo.ru/video', 'vkvideo.ru/videoext.php?oid=')
					.replace('_', '&id=')
					.replace('videoext', 'video_ext')}
				allowfullscreen
			></iframe>
		{/if}
		{#if post.cover.video?.includes('https://vk.com')}
			<iframe
				title=""
				class="w-100 ratio-16x9 rounded-3 border-0"
				src={post.cover.video}
				allowfullscreen
			></iframe>
		{/if}
	{/if}

	<div class="d-flex flex-column">
		<div class="text-uppercase fw-bold">{@html post?.title}</div>
		<div class="">{@html post?.description}</div>
	</div>
</div>
