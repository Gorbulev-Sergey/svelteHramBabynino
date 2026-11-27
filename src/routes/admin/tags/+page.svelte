<script lang="ts">
	import BreadCrumb from '#lib/components/BreadCrumb.svelte';
	import Dialog from '#lib/components/Dialog.svelte';
	import MaketAdmin from '#lib/components/MaketAdmin.svelte';
	import { db } from '#lib/settings/firebase.ts';
	import { Table } from '@gorbulevsv/table';
	import { onValue, ref, set } from 'firebase/database';
	import { onMount } from 'svelte';

	let tags = $state<{ name: string; description: string }[]>([]);

	let dialog: {
		tag: { index: number; name: string; description: string } | null;
		isShow: boolean;
	} = $state({
		tag: null,
		isShow: false
	});
	let isShow = $state(false);

	onMount(async () => {
		onValue(ref(db, 'tags'), (r) => {
			if (r.exists())
				tags = r.val().map((v, i: number) => {
					return { index: i, ...v, settings: { snippet: tagSnippet } };
				});
		});
	});

	let { data } = $props();
</script>

{#snippet tagSnippet(obj: { index: number; name: string; description: string })}
	<button
		title=""
		class="btn btn-sm btn-icon rounded-3"
		onclick={() => {
			dialog.tag = { index: obj.index, name: obj.name, description: obj.description };
			dialog.isShow = true;
		}}><i class="bi bi-gear"></i></button
	>
{/snippet}

<MaketAdmin {data}>
	{#snippet breadCrumb()}
		<BreadCrumb routes={[{ url: 'admin/tags', title: 'Теги' }]} hasStartArrow={false} />
	{/snippet}

	{#if tags.length > 0}
		<Table data={tags} />
	{/if}
</MaketAdmin>

<Dialog
	title="Настроить тег"
	bind:isShow={dialog.isShow}
	onOk={() => {
		if (dialog.tag?.name)
			set(ref(db, `tags/${dialog.tag.index}`), {
				name: dialog.tag.name,
				description: dialog.tag.description
			});
	}}
>
	{#if dialog.tag}
		<div>
			<div>name:</div>
			<input class=" form-control form-control-sm rounded-3" bind:value={dialog.tag.name} />
		</div>
		<div>
			<div>description:</div>
			<input class=" form-control form-control-sm rounded-3" bind:value={dialog.tag.description} />
		</div>
	{/if}
</Dialog>
