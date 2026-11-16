<script lang="ts">
	import favicon from '#lib/assets/favicon.png';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import { Toaster } from '@gorbulevsv/toaster';
	import type { Snippet } from 'svelte';

	interface IProps {
		title?: Snippet | null;
		subTitle?: Snippet | null;
		menu?: Snippet | null;
		children?: Snippet | null;
		footer?: Snippet | null;
	}

	function toggleTheme() {
		let theme = document.querySelector('[data-bs-theme]');
		theme?.setAttribute(
			'data-bs-theme',
			theme.getAttribute('data-bs-theme') == 'light' ? 'dark' : 'light'
		);
		cookieStore.set('theme', theme?.getAttribute('data-bs-theme') || 'light');
	}

	let { title, subTitle, menu, children, footer }: IProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Храм Вознесения Господня</title>
</svelte:head>

<div class="sticky-top w-100">
	<div class="d-flex flex-column px-4 py-2 bg-1 bg-70" style="backdrop-filter: blur(1em);">
		<div class="d-flex align-items-center">
			{#if title}
				<div class="d-flex align-items-center gap-0 flex-wrap">
					{@render title?.()}
				</div>
			{/if}

			<div class="flex-grow-1 d-flex align-items-center justify-content-end flex-wrap gap-1">
				<button title="Тема" class="btn btn-sm rounded-3" onclick={toggleTheme}>
					<i class="bi bi-sun"></i>
				</button>
				{#if menu}
					{@render menu?.()}
				{/if}
			</div>
		</div>
		{#if subTitle}
			<div class="px-3 py-2">
				{@render subTitle?.()}
			</div>
		{/if}
	</div>
</div>

<div class="container my-8" style="min-height: 100dvh;">
	{@render children?.()}
</div>

{#if footer}
	<div class="d-flex flex-column align-items-center w-100 bg-1 bg-70 p-6" style="min-height: 10em;">
		{@render footer?.()}
	</div>
{/if}

<Toaster />

<style>
	/* Настройка цветов фона для светлой и темной темы */
	:global(:root) {
		--bs-bg-body: light-dark(var(--bs-white), var(--bs-gray-800));
	}
</style>
