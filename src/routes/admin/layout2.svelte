<script lang="ts">
	import ButtonIcon from '#lib/components/ButtonIcon.svelte';
	import Layout1 from '#lib/components/Layout1.svelte';
	import type { IRoute } from '#lib/models/Route.ts';
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { page } from '$app/state';

	const routes: IRoute[] = [
		{ name: 'Публикации', url: '/admin', icon: '<i class="bi bi-newspaper"></i>' },
		{ name: 'Пользователи', url: '/admin/users', icon: '<i class="bi bi-people"></i>' },
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

{#snippet sidebar()}
	<div class="d-flex flex-column gap-1 flex-wrap">
		{#each routes as route}
			<ButtonIcon text={route.name} icon={route.icon} href={route.url} isOpen={false} />
		{/each}
	</div>
{/snippet}

{#snippet menu()}
	<div class="d-flex align-items-center justify-content-end">
		<button class="btn btn-sm rounded-3">Создать</button>
	</div>
{/snippet}

<Layout1 {sidebar} {title} {menu} subTitle={STORE.subPanel} {data}>
	{@render children?.()}
</Layout1>
