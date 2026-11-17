<script lang="ts">
	import Dialog from '#lib/components/Dialog.svelte';
	import PageTitle from '#lib/components/PageTitle.svelte';
	import { db } from '#lib/settings/firebase.ts';
	import { Table } from '@gorbulevsv/table';
	import { onValue, ref, set } from 'firebase/database';
	import { onMount } from 'svelte';
	import { description, number } from 'valibot';

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

	$inspect(tags);
</script>

<PageTitle>
	<div class="d-flex align-items-center gap-3">
		<div>Панель администратора</div>
		<div>
			<i class="bi bi-chevron-right"></i>
		</div>
		<div class="bg-3 rounded-3 px-2">Теги</div>
	</div>
</PageTitle>

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

{#if tags.length > 0}
	<Table data={tags} />
{/if}

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
