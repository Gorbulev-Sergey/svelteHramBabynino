<script lang="ts">
	import favicon from '#lib/assets/favicon.png';
	import max from '#lib/assets/max.svg';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import type { IRoute } from '#lib/models/Route.ts';
	import { Toaster } from '@gorbulevsv/toaster';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';

	const routes: IRoute[] = [
		{ name: 'Главная', url: '/' },
		{ name: 'Расписание', url: '/schedule' }
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
		children?: Snippet;
		data: any;
	}

	let { breadCrumb, sub, children, data }: IProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Храм Вознесения Господня</title>
</svelte:head>

{#snippet mainNav()}
	{#each routes as route}
		<a
			class="btn btn-sm light {page.url.pathname === route.url
				? 'fw-bold'
				: ''} rounded-3 text-uppercase px-2"
			href={route.url}>{@html route.name}</a
		>
	{/each}
{/snippet}

{#snippet addNav()}
	<button
		title="пользователь"
		class="btn px-1 btn-sm light border-0 rounded-3"
		data-bs-toggle="menu"
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
{/snippet}

{#snippet footer()}
	<div class="d-flex flex-column align-items-center w-100 light p-6" style="min-height: 10em;">
		<div class="container flex-grow-1 d-flex flex-column align-items-center flex-wrap row-gap-1">
			<div class="flex-grow-1 d-flex flex-wrap align-items-center justify-content-center gap-1">
				<b class="mb-0">Контакты для связи:</b>
				<div class="d-inline-flex flex-wrap align-items-center justify-content-center gap-1">
					<i>храм:</i>
					<div class="d-flex flex-lg-row flex-wrap text-nowrap align-items-center gap-1">
						<a
							class="badge bg-dark text-light text-decoration-none"
							href="tel:89029346362"
							target="_blank">+79029346362</a
						>,
					</div>
				</div>
				<div class="d-inline-flex flex-wrap align-items-center justify-content-center gap-1">
					<i>иерей Алексий (настоятель):</i>
					<div class="d-flex flex-wrap text-nowrap justify-content-center align-items-center gap-1">
						<a
							class="badge bg-primary text-decoration-none p-0"
							href="https://max.ru/101623517"
							target="_blank"
							style="width: 1.7em; height: 1.7em;"
							title="Max"><img src={max} alt="" /></a
						>
						<a
							class="badge bg-dark text-light text-decoration-none"
							href="tel:89208768928"
							target="_blank">+79208768928</a
						>,
					</div>
				</div>

				<div class="d-inline-flex flex-wrap align-items-center justify-content-center gap-1">
					<i>иерей Сергий:</i>
					<div class="d-flex flex-wrap text-nowrap justify-content-center align-items-center gap-1">
						<a
							class="badge bg-primary text-decoration-none p-0"
							href="https://max.ru/44254244"
							target="_blank"
							style="width: 1.7em; height: 1.7em;"
							title="Max"><img src={max} alt="" /></a
						>
						<a
							class="badge bg-dark text-light text-decoration-none"
							href="tel:89105163686"
							target="_blank">+79105163686</a
						>
					</div>
				</div>
			</div>

			<div class="mb-0 fw-bold text-center">
				<i class="bi bi-c-circle"></i>
				Калужская область, посёлок Бабынино, храм "Вознесения Господня", {new Date().getFullYear()}
				год
			</div>

			<a
				href="https://tips.tips/000469265"
				class="btn btn-solid theme-inverse rounded-3 mt-1"
				target="_blank"
			>
				Поддержать наш храм
			</a>

			<a class="btn btn-sm bg-3 rounded-3 mt-2 mb-1 px-3 py-2" href="#top">
				<div class="d-flex flex-column align-items-center justify-content-center text-center">
					<i class="bi bi-chevron-up"></i>
					<div>Наверх</div>
				</div>
			</a>
		</div>
	</div>
{/snippet}

<div class="sticky-top w-100">
	<div class="d-flex flex-column px-4 py-2 light">
		<div class="d-flex align-items-center px-1">
			<div class="d-flex align-items-center gap-0 flex-wrap">
				<a class="btn bg-transparent rounded-3 px-2" href="/">
					<b class="fg-danger text-uppercase">Храм Вознесения Господня</b>
				</a>
				{@render breadCrumb?.()}
			</div>
			<div class="flex-grow-1 d-flex align-items-center justify-content-end flex-wrap gap-1">
				<button title="Тема" class="btn btn-sm light rounded-3" onclick={toggleTheme}>
					<i class="bi bi-sun"></i>
				</button>
				{@render mainNav?.()}
				{@render addNav?.()}
			</div>
		</div>
		{#if sub}
			<div class="px-3 pt-1 pb-2">
				{@render sub?.()}
			</div>
		{/if}
	</div>
</div>
<div class="container my-8" style="min-height: 100dvh;">
	{@render children?.()}
</div>

{@render footer?.()}

<Toaster />
