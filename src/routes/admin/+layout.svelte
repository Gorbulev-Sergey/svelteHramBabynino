<script>
	import Footer from '$lib/components/Footer.svelte';
	import IsAuth from '$lib/components/IsAuth.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Theme from '$lib/components/Theme.svelte';

	let routesLeft = [
		{
			url: '/admin/posts',
			title: 'Публикации'
		},
		{
			url: '/admin/schedule',
			title: 'Расписание'
		},
		{
			url: '/admin/photos',
			title: 'Фотографии'
		},
		{
			url: '/admin/tags',
			title: 'Теги'
		},
		{
			url: '/admin/contacts',
			title: 'Контакты'
		},
		{
			url: '/admin/storage',
			title: 'Хранилище'
		}
	];
	let routesRight = [
		{
			url: '/guest/posts',
			title: 'Сайт'
		}
	];
</script>

<Theme />
<IsAuth>
	<Navigation title="Панель управления" {routesLeft} {routesRight} />
	<div class="container" style="margin-top:4.5em; margin-bottom:2em; min-height:90vh;">
		<slot />
	</div>
	<Footer />
</IsAuth>
