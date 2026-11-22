<script lang="ts">
	interface IProps {
		text?: string;
		placeholder?: string;
		icon?: string;
		isOpen?: boolean;
		href?: string;
		reverse?: boolean;
		onClick?: () => void;
		_class?: string;
		_style?: string;
	}

	let {
		text,
		placeholder,
		icon,
		isOpen = true,
		href,
		reverse = false,
		onClick,
		_class = 'w-100',
		_style
	}: IProps = $props();
</script>

{#snippet buttonSnippet(icon?: string, text?: string, isOpen: boolean = true)}
	<div class="w-100 d-flex align-items-baseline gap-2">
		{#if icon && !reverse}
			{@html icon}
		{/if}
		{#if text && isOpen}
			<div>
				{text}
			</div>
		{/if}
		{#if icon && reverse}
			{@html icon}
		{/if}
	</div>
{/snippet}

{#if href}
	<a
		class="btn rounded-3 {_class}"
		style={_style}
		title={placeholder ? placeholder : text}
		{href}
		onclick={() => onClick?.()}
	>
		{@render buttonSnippet?.(icon, text, isOpen)}
	</a>
{:else}
	<button
		class="btn rounded-3 {_class}"
		style={_style}
		title={placeholder ? placeholder : text}
		onclick={() => onClick?.()}
	>
		{@render buttonSnippet?.(icon, text, isOpen)}
	</button>
{/if}
