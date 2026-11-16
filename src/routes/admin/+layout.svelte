<script lang="ts">
	import Layout from '#lib/components/Layout.svelte';
	import type { IRoute } from '#lib/models/Route.ts';
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { page } from '$app/state';

	const routes: IRoute[] = [
		{ name: 'Публикации', url: '/admin' },
		{ name: 'Пользователи', url: '/admin/users' },
		{ name: 'Теги', url: '/admin/tags' }
	];

	let { children } = $props();
</script>

{#snippet title()}
	<div class="d-flex align-items-center gap-2">
		<div class=" text-uppercase">Панель администратора</div>
		<div>
			<i class="bi bi-chevron-right"></i>
		</div>
		<div class="bg-3 rounded-3 px-2">{routes.find((r) => r.url === page.route.id)?.name}</div>
	</div>
{/snippet}

{#snippet menu()}
	<div class="d-flex align-items-center justify-content-start gap-2 flex-wrap">
		{#each routes as route}
			<a class="btn btn-sm rounded-3" href={route.url}> {route.name} </a>
		{/each}
	</div>
{/snippet}

<Layout {title} subTitle={STORE.subPanel} {menu}>
	{@render children?.()}
</Layout>
