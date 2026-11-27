<script lang="ts">
	import favicon from '#lib/assets/favicon.png';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import ButtonIcon from '#lib/components/ButtonIcon.svelte';
	import type { IRoute } from '#lib/models/Route.ts';
	import { logOutSession } from '#lib/remoutes/firebase-admin.remote.ts';
	import { auth } from '#lib/settings/firebase.ts';
	import { STORE } from '#lib/settings/store.svelte.ts';
	import { goto, refreshAll } from '$app/navigation';
	import { Toaster } from '@gorbulevsv/toaster';
	import Slot from '#lib/components/Slot.svelte';
	import type { Snippet } from 'svelte';

	const routes: IRoute[] = [
		{ name: 'Публикации', url: '/admin', icon: '<i class="bi bi-newspaper"></i>' },
		{ name: 'Пользователи', url: '/admin/users', icon: '<i class="bi bi-people"></i>' },
		{ name: 'Теги', url: '/admin/tags', icon: '<i class="bi bi-bookmarks"></i>' }
	];

	function toggleTheme() {
		let theme = document.querySelector('[data-bs-theme]');
		theme?.setAttribute(
			'data-bs-theme',
			theme.getAttribute('data-bs-theme') == 'light' ? 'dark' : 'light'
		);
		cookieStore.set('theme', theme?.getAttribute('data-bs-theme') || 'light');
	}

	interface IProps {
		breadCrumb?: Snippet;
		sub?: Snippet;
		medium?: Snippet;
		children?: Snippet;
		data?: any;
	}

	let { breadCrumb, sub, medium, children, data }: IProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Храм Вознесения Господня</title>
</svelte:head>

{#snippet mainNav()}
	{#each routes as route}
		<ButtonIcon
			text={route.name}
			icon={route.icon}
			href={route.url}
			isOpen={STORE.ADMIN.sidebar.isOpen}
		/>
	{/each}
{/snippet}

{#snippet addNav()}
	<nav class="d-flex align-items-center gap-1">
		<button title="Тема" class="btn btn-sm rounded-3" onclick={toggleTheme}>
			<i class="bi bi-sun"></i>
		</button>
		<button
			title=""
			class="btn-icon btn-sm border-0 rounded-3"
			data-bs-toggle="menu"
			aria-expanded="false"
		>
			{#if data.user && data.user.picture}
				<span class="avatar avatar-xs">
					<img class="avatar-img rounded-3" src={data.user.picture} alt="" />
				</span>
			{:else}
				<i class="bi bi-person"></i>
			{/if}
		</button>
		<div class="menu border-0 shadow-sm rounded-3">
			{#if data.user}
				<a class="menu-item rounded-3" href="/admin/profile">Профиль</a>
			{/if}
			<button
				class="menu-item rounded-3"
				onclick={async () => {
					await auth.signOut();
					await logOutSession();
					await refreshAll();
					goto('/');
				}}>Выйти</button
			>
		</div>
	</nav>
{/snippet}

<div class="w-100">
	<aside
		bind:clientWidth={STORE.ADMIN.sidebar.width}
		class="position-fixed bg-3"
		style="height: {STORE.ADMIN.sidebar.height}dvh;"
	>
		<div
			class="d-flex flex-column p-2 pt-1 bg-1 bg-70 gap-1 h-100"
			style="backdrop-filter: blur(1em);"
		>
			<div class="d-flex align-items-center">
				{#if STORE.ADMIN.sidebar.isOpen}
					<a class="btn bg-transparent rounded-3 text-uppercase text-start" href="/admin">
						<div class="w-100 fw-bold">Панель администратора</div>
					</a>
				{/if}
				<button
					title="Свернуть/Развернуть панель"
					class="btn rounded-3 {STORE.ADMIN.sidebar.isOpen ? '' : 'btn-solid theme-secondary'}"
					onclick={() => (STORE.ADMIN.sidebar.isOpen = !STORE.ADMIN.sidebar.isOpen)}
				>
					<i class="bi bi-arrows-{STORE.ADMIN.sidebar.isOpen ? 'collapse' : 'expand'}-vertical"></i>
				</button>
			</div>
			<div class="d-flex flex-column flex-wrap gap-1">
				<div class="d-flex flex-column gap-1 flex-wrap">
					{@render mainNav?.()}
				</div>
			</div>

			<div class="flex-grow-1 d-flex flex-column justify-content-end h-100">
				<div
					class="d-flex {STORE.ADMIN.sidebar.isOpen
						? ''
						: 'flex-column'} align-items-center justify-content-between gap-1"
				>
					<ButtonIcon
						text="Вернуться на сайт"
						icon="<i class='bi bi-box-arrow-left'></i>"
						href="/"
						isOpen={STORE.ADMIN.sidebar.isOpen}
						_class="{STORE.ADMIN.sidebar.isOpen ? '' : 'btn-solid theme-secondary'} w-100"
					/>
				</div>
			</div>
		</div>
	</aside>
	<main class="flex-grow-1" style="margin-left: {STORE.ADMIN.sidebar.width}px;">
		<div class="sticky-top px-4 pt-3 pb-1 bg-1 w-100" style="margin-left: .25px;">
			<div class="d-flex align-items-center gap-1 w-100">
				<div class="d-flex align-items-center gap-2">
					{@render breadCrumb?.()}
				</div>
				<div class="flex-grow-1">
					{@render medium?.()}
				</div>
				{@render addNav?.()}
			</div>

			{#if STORE.panels?.sub}
				<div class="px-0 py-1">
					{@render sub?.()}
				</div>
			{/if}
		</div>

		<main class="px-4 pt-3 pb-9">
			{@render children?.()}
		</main>
	</main>
</div>

<Toaster />

<style>
	/* Настройка цветов фона для светлой и темной темы */
	:global(:root) {
		--bs-bg-body: light-dark(var(--bs-white), var(--bs-pewter-700));
		--bs-bg-1: light-dark(var(--bs-pewter-025), var(--bs-pewter-800));
	}
</style>
