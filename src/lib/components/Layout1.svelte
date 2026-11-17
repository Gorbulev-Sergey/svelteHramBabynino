<script lang="ts">
	import { STORE } from '#lib/settings/store.svelte.ts';
	import favicon from '#lib/assets/favicon.png';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import { Toaster } from '@gorbulevsv/toaster';
	import type { Snippet } from 'svelte';
	import { auth } from '#lib/settings/firebase.ts';
	import { logInSession, logOutSession } from '#lib/remoutes/firebase-admin.remote.ts';
	import { getIdToken, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { goto, refreshAll } from '$app/navigation';
	import type { LayoutProps } from './$types';
	import ButtonIcon from './ButtonIcon.svelte';
	import { fade } from 'svelte/transition';

	interface IProps {
		sidebar?: Snippet | null;
		title?: Snippet | null;
		subTitle?: Snippet | null;
		menu?: Snippet | null;
		children?: Snippet | null;
		footer?: Snippet | null;
		data?: LayoutProps;
	}

	function toggleTheme() {
		let theme = document.querySelector('[data-bs-theme]');
		theme?.setAttribute(
			'data-bs-theme',
			theme.getAttribute('data-bs-theme') == 'light' ? 'dark' : 'light'
		);
		cookieStore.set('theme', theme?.getAttribute('data-bs-theme') || 'light');
	}

	let { sidebar, title, subTitle, menu, children, footer, data }: IProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Храм Вознесения Господня</title>
</svelte:head>

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
				{#if sidebar}
					{@render sidebar?.()}
				{/if}
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
		<div class="sticky-top px-4 py-3 bg-1 w-100" style="margin-left: .25px;">
			<div class="d-flex align-items-center gap-1 w-100">
				{#if title}
					{@render title?.()}
				{/if}
				<div class="flex-grow-1">
					{#if menu}
						{@render menu?.()}
					{/if}
				</div>
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
			</div>

			{#if subTitle}
				<div class="px-0 pt-3 pb-1">
					{@render subTitle?.()}
				</div>
			{/if}
		</div>

		<div class="px-4 py-3">
			{@render children?.()}
		</div>

		{#if footer}
			<div
				class="d-flex flex-column align-items-center w-100 bg-1 bg-70 p-6"
				style="min-height: 10em;"
			>
				{@render footer?.()}
			</div>
		{/if}
	</main>
</div>

<Toaster />

<style>
	/* Настройка цветов фона для светлой и темной темы */
	:global(:root) {
		--bs-bg-body: light-dark(var(--bs-white), var(--bs-gray-800));
	}
</style>
