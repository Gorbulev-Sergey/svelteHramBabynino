<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import SubPanel from '#lib/components/SubPanel.svelte';
	import type { IRoute } from '#lib/models/Route.ts';
	import { page } from '$app/state';

	const routes: IRoute[] = [
		{ name: 'Публикации', url: '/admin' },
		{ name: 'Пользователи', url: '/admin/users' }
	];

	let { children } = $props();
</script>

<PageTitle>
	<div>Панель администратора</div>
	<div>
		<i class="bi bi-chevron-right"></i>
	</div>
	<div class="bg-3 rounded-3 px-2">{routes.find((r) => r.url === page.route.id)?.name}</div>
</PageTitle>

<SubPanel>
	<div class="d-flex align-items-center justify-content-start gap-2 flex-wrap">
		{#each routes as route}
			<a class="btn btn-sm rounded-3" href={route.url}> {route.name} </a>
		{/each}
	</div>
</SubPanel>

{@render children?.()}
