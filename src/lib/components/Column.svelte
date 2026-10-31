<script lang="ts">
	let { children, gap = '3' } = $props();
</script>

<div class="d-flex flex-column gap-{gap} w-100">
	{@render children?.()}
</div>
