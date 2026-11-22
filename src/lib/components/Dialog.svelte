<script lang="ts">
	import type { Snippet } from 'svelte';

	interface IProps {
		title?: string;
		okTitle?: string;
		cancelTitle?: string;
		isShow?: boolean;
		autoCloseOnOk?: boolean;
		_class?: string;
		children?: Snippet<[]>;
		onOk?: () => void;
		onCancel?: () => void;
	}

	// let id = crypto.randomUUID();
	let id = Date.now().toString();
	let dialog = $derived(document.getElementById(id) as HTMLDialogElement);
	$effect(() => {
		if (isShow) dialog.showModal();
		else dialog.close();
	});

	let {
		title,
		okTitle = 'Ok',
		cancelTitle = 'Отмена',
		autoCloseOnOk = true,
		isShow = $bindable(false),
		_class,
		children,
		onOk = () => {},
		onCancel = () => {}
	}: IProps = $props();
</script>

<dialog {id} class="my-dialog border-0 p-0 bg-transparent shadow-sm" style="min-width: 25%;">
	<div class="rounded-3 p-0 bg-body w-100">
		<div
			class="d-flex align-items-center justify-content-between text-uppercase rounded-top-4 bg-1 ps-4 pe-1 py-1 w-100"
		>
			<b>{@html title}</b>
			<button
				title="Закрыть"
				class="btn btn-sm px-2 rounded-3"
				onclick={() => {
					isShow = false;
					onCancel();
				}}
			>
				<i class="bi bi-x-lg"></i>
			</button>
		</div>
		<div class="d-flex flex-column align-items-start p-4 pt-5 gap-5 {_class}">
			<div class="d-flex flex-column gap-4 w-100">
				{@render children?.()}
			</div>
			<div class="d-flex align-items-center justify-content-between w-100">
				<button
					class="btn btn-sm rounded-3"
					onclick={() => {
						isShow = false;
						onCancel();
					}}>{cancelTitle}</button
				>
				<button
					class="btn btn-sm btn-solid theme-inverse rounded-3"
					onclick={() => {
						onOk();
						if (autoCloseOnOk) {
							isShow = false;
							onCancel();
						}
					}}>{okTitle}</button
				>
			</div>
		</div>
	</div>
</dialog>

<style>
	.my-dialog::backdrop {
		background: rgba(0, 0, 0, 0.07);
		backdrop-filter: blur(0.7em);
	}
</style>
