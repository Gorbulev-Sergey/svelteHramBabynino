<script lang="ts">
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

	interface IProps {
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

	let sidebar = $state({ width: 0, height: 100 });

	let { title, subTitle, menu, children, footer, data }: IProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Храм Вознесения Господня</title>
</svelte:head>

<div class="w-100">
	<aside
		bind:clientWidth={sidebar.width}
		class="position-fixed bg-1"
		style="height: {sidebar.height}dvh;"
	>
		<div class="d-flex flex-column p-2 bg-1 bg-70 gap-1 h-100" style="backdrop-filter: blur(1em);">
			<a class="btn btn-sm bg-transparent rounded-3 text-uppercase text-start" href="/admin">
				<div class="w-100 fw-bold">Панель администратора</div>
			</a>

			<div class="d-flex flex-column flex-wrap gap-1">
				{#if menu}
					{@render menu?.()}
				{/if}
			</div>

			<div class="flex-grow-1 d-flex flex-column justify-content-end h-100">
				<button title="Тема" class="btn btn-sm rounded-3" onclick={toggleTheme}>
					<i class="bi bi-sun"></i>
				</button>
			</div>
		</div>
	</aside>
	<main class="flex-grow-1" style="margin-left: {sidebar.width}px;">
		<div class="sticky-top px-4 py-3 bg-1 bg-70 w-100" style="backdrop-filter: blur(1em);">
			<div class="d-flex align-items-center w-100">
				{#if title}
					{@render title?.()}
				{/if}
				<div class="flex-grow-1 d-flex align-items-center justify-content-end">
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
					<nav class="menu border-0 shadow-sm rounded-3">
						{#if data.user && data.user.role === 'admin'}
							<a class="menu-item rounded-3" href="/admin">Панель администратора</a>
						{/if}
						{#if data.user}
							<button
								class="menu-item rounded-3"
								onclick={async () => {
									await auth.signOut();
									await logOutSession();
									await refreshAll();
									goto('/');
								}}>Выйти</button
							>
						{:else}
							<button
								class="menu-item rounded-3"
								onclick={async () => {
									const result = await signInWithPopup(auth, new GoogleAuthProvider());
									const idToken = await getIdToken(result.user);

									await logInSession(idToken);
									await refreshAll();
								}}>Войти через Google</button
							>
						{/if}
					</nav>
				</div>
			</div>

			{#if subTitle}
				<div class="px-0 pt-3 pb-1">
					{@render subTitle?.()}
				</div>
			{/if}
		</div>

		<div class="px-4 py-5" style="min-height: 100dvh;">
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
