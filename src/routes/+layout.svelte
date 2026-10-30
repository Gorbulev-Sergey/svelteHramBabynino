<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import { STORE } from '#lib/settings/store.svelte.ts';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Храм Вознесения Господня</title>
</svelte:head>

<div class="sticky-top w-100">
	<div class="d-flex align-items-center px-4 py-2 bg-2 bg-70" style="backdrop-filter: blur(1em);">
		<div class="d-flex align-items-center gap-0 flex-wrap">
			<a class="btn bg-transparent px-3" href="/">
				Храм <b class="text-uppercase">Вознесения Господня</b>
			</a>
			{#if STORE.pageTitle}
				<div>
					<i class="bi bi-chevron-right"></i>
				</div>
				{@render STORE.pageTitle?.()}
			{/if}
		</div>
		<div class="flex-grow-1 d-flex align-items-center justify-content-end flex-wrap gap-1">
			<a class="btn btn-sm rounded-3" href="/">Главная</a>
			<a class="btn btn-sm rounded-3" href="/">Расписание</a>
			<a class="btn btn-sm rounded-3" href="/">О храме</a>
			<a class="btn btn-sm rounded-3" href="/admin">Admin</a>
		</div>
	</div>
</div>
<div class="container my-3" style="min-height: 100dvh;">
	{@render children()}
</div>

<div class="d-flex flex-column align-items-center w-100 bg-1 p-6" style="min-height: 10em;">
	<div>Бабынино, храм Вознесения Господня</div>
</div>
