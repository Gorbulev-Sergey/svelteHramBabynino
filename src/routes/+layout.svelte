<script lang="ts">
	import favicon from '#lib/assets/favicon.png';
	import type { LayoutProps } from './$types';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import { STORE } from '#lib/settings/store.svelte.ts';
	import type { IRoute } from '#lib/models/Route.ts';
	import { auth } from '#lib/settings/firebase.ts';
	import { logInSession, logOutSession } from '#lib/remoutes/firebase-admin.remote.ts';
	import { goto, refreshAll } from '$app/navigation';
	import { signInWithPopup, GoogleAuthProvider, getIdToken } from 'firebase/auth';

	let { children, data }: LayoutProps = $props();

	const routes: IRoute[] = [
		{ name: 'Главная', url: '/' },
		{ name: 'Расписание', url: '/' }
	];

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
	<div class="d-flex flex-column px-4 py-2 bg-2 bg-70" style="backdrop-filter: blur(1em);">
		<div class="d-flex align-items-center">
			<div class="d-flex align-items-center gap-0 flex-wrap">
				<a class="btn bg-transparent px-3" href="/">
					Храм <b class="">Вознесения Господня</b>
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

				{#each routes as route}
					<a class="btn btn-sm rounded-3 bg-transparent text-uppercase px-2" href={route.url}
						>{@html route.name}</a
					>
				{/each}

				<button
					title=""
					class="btn-icon btn-sm rounded-3"
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
				</div>
			</div>
		</div>
		{#if STORE.subPanel}
			<div class="px-3 py-2">
				{@render STORE.subPanel?.()}
			</div>
		{/if}
	</div>
</div>
<div class="container my-8" style="min-height: 100dvh;">
	{@render children()}
</div>

<div class="d-flex flex-column align-items-center w-100 bg-2 bg-70 p-6" style="min-height: 10em;">
	<div>Бабынино, храм Вознесения Господня</div>
</div>

<style>
	/* Настройка цветов фона для светлой и темной темы */
	:global(:root) {
		--bs-bg-body: light-dark(var(--bs-white), var(--bs-gray-800));
	}
</style>
