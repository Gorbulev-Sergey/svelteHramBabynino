<script lang="ts">
	import Layout1 from '#lib/components/Layout1.svelte';
	import type { IRoute } from '#lib/models/Route.ts';
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { page } from '$app/state';

	const routes: IRoute[] = [
		{ name: 'Публикации', url: '/admin', icon: '<i class="bi bi-newspaper"></i>' },
		{ name: 'Пользователи', url: '/admin/users', icon: '<i class="bi bi-table"></i>' },
		{ name: 'Теги', url: '/admin/tags', icon: '<i class="bi bi-bookmarks"></i>' }
	];

	let { children, data } = $props();
</script>

{#snippet title()}
	<div class="d-flex align-items-center gap-2">
		<div class="rounded-3 px-2 fw-bold text-uppercase">
			{routes.find((r) => r.url === page.route.id)?.name}
		</div>
	</div>
{/snippet}

{#snippet menu()}
	<div class="d-flex flex-column gap-1 flex-wrap">
		{#each routes as route}
			<a class="btn rounded-3 text-start" href={route.url}>
				<div class="w-100 d-flex align-items-baseline gap-2">
					{#if route.icon}
						{@html route.icon}
					{/if}
					<div>
						{route.name}
					</div>
				</div>
			</a>
		{/each}
	</div>
{/snippet}

<Layout1 {title} subTitle={STORE.subPanel} {menu} {data}>
	{@render children?.()}
</Layout1>
