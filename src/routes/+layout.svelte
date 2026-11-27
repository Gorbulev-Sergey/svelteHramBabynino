<script lang="ts">
	let { children } = $props();
</script>

{@render children?.()}

<style>
	/* Настройка цветов фона для светлой и темной темы */
	:global(:root) {
		--bs-bg-body: light-dark(var(--bs-white), var(--bs-gray-800));
	}

	:global(.light) {
		background: light-dark(var(--bs-gray-025), var(--bs-gray-900));
		color: light-dark(var(--bs-gray-900), var(--bs-gray-025));
	}
	:global(.btn.light:hover) {
		background: light-dark(var(--bs-gray-100), var(--bs-gray-800));
		color: light-dark(var(--bs-gray-900), var(--bs-gray-025));
	}

	:global(.dark) {
		background: light-dark(var(--bs-gray-800), var(--bs-gray-100));
		color: light-dark(var(--bs-white), var(--bs-gray-900));
	}
	:global(.btn.dark:hover) {
		background: light-dark(var(--bs-black), var(--bs-gray-200));
		color: light-dark(var(--bs-gray-100), var(--bs-gray-900));
	}
</style>
