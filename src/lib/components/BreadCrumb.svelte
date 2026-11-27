<script lang="ts">
	interface IProps {
		routes: { url: string; title: string }[];
		hasStartArrow?: boolean;
	}
	let { routes, hasStartArrow = true }: IProps = $props();
</script>

<div class="d-flex align-items-center gap-2">
	{#each routes as { url, title }, i}
		{#if hasStartArrow || i !== 0}
			<div>
				<i class="bi bi-chevron-right"></i>
			</div>
		{/if}
		<a
			class="fw-bold text-uppercase rounded-3 py-0 text-decoration-none fg-1 {i ===
				routes.length - 1 && routes.length > 1
				? 'bg-3 px-3'
				: ''}"
			href={url}
		>
			{title}
		</a>
	{/each}
</div>
