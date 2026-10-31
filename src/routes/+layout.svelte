<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import { STORE } from '#lib/settings/store.svelte.ts';

	let { children }: LayoutProps = $props();

	function toggleTheme() {
		let theme = document.querySelector('[data-bs-theme]');
		theme?.setAttribute(
			'data-bs-theme',
			theme.getAttribute('data-bs-theme') == 'light' ? 'dark' : 'light'
		);
		cookieStore.set('theme', theme?.getAttribute('data-bs-theme') || 'light');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Храм Вознесения Господня</title>
</svelte:head>

<div class="sticky-top w-100">
	<div class="d-flex flex-column px-4 py-2 bg-body bg-70" style="backdrop-filter: blur(1em);">
		<div class="d-flex align-items-center">
			<div class="d-flex align-items-center gap-0 flex-wrap">
				<a class="btn bg-transparent px-3" href="/">
					Храм <b class="text-uppercase">Вознесения Господня</b>
				</a>
				{#if STORE.pageTitle}
					<div>
						<i class="bi bi-chevron-right"></i>
					</div>
					<div class="btn bg-transparent text-uppercase fw-bold px-3">
						{@render STORE.pageTitle?.()}
					</div>
				{/if}
			</div>
			<div class="flex-grow-1 d-flex align-items-center justify-content-end flex-wrap gap-1">
				<button title="Тема" class="btn btn-sm rounded-3" onclick={toggleTheme}>
					<i class="bi bi-sun"></i>
				</button>
				<a class="btn btn-sm rounded-3 bg-transparent" href="/">Главная</a>
				<a class="btn btn-sm rounded-3 bg-transparent" href="/">Расписание</a>
				<a class="btn btn-sm rounded-3 bg-transparent" href="/">О храме</a>
				<a class="btn btn-sm rounded-3 bg-transparent" href="/admin">Admin</a>
			</div>
		</div>
		{#if STORE.subPanel}
			<div class="px-3 pt-3">
				{@render STORE.subPanel?.()}
			</div>
		{/if}
	</div>
</div>
<div class="container my-7" style="min-height: 100dvh;">
	{@render children()}
</div>

<div class="d-flex flex-column align-items-center w-100 bg-1 p-6" style="min-height: 10em;">
	<div>Бабынино, храм Вознесения Господня</div>
</div>

<style>
	/* Настройка цветов фона для светлой и темной темы */
	:global(:root) {
		--bs-bg-body: light-dark(var(--bs-white), var(--bs-gray-900));
	}
</style>
