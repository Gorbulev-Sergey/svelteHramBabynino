<script lang="ts">
	import Column from '#lib/components/Column.svelte';
	import Dialog from '#lib/components/Dialog.svelte';
	import { Roles, type TRole } from '#lib/models/Role.ts';
	import { addRoleToUser, changeUserName, getUsers } from '#lib/remoutes/firebase-admin.remote.ts';
	import { refreshAll } from '$app/navigation';
	import { Table } from '@gorbulevsv/table';
	import { toast } from '@gorbulevsv/toaster';

	let users = $derived(await getUsers());
	let usersForTable = $derived(
		users.map((u) => {
			const { uid, email, name, picture, customClaims, ...rest } = u; // убираем uid
			return {
				picture: {
					snippet: pictureSnippet,
					url: picture
				},
				email,
				name: {
					snippet: nameSnippet,
					value: name
				},
				role: {
					snippet: roleSnippet,
					uid: uid,
					value: customClaims?.role
				},
				uid
			};
		})
	);
	let { data } = $props();

	let userDialog = $state<{
		isShowDialogName: boolean;
		selected: { uid?: string; name: string };
	}>({
		isShowDialogName: false,
		selected: { name: '' }
	});
</script>

{#snippet pictureSnippet(obj: { uid: string; picture: { url?: string } })}
	{#if obj.picture.url}
		<div class="d-flex align-items-center gap-2 w-100">
			<div class="avatar">
				<img class="avatar-img" src={obj.picture.url} alt="" />
			</div>
			{#if obj.uid === data.user?.uid}
				<div class="badge bg-info bg-20">текущий пользователь</div>
			{/if}
		</div>
	{/if}
{/snippet}

{#snippet roleSnippet(obj: { role: { uid: string; value: TRole | null } })}
	<div>
		<button title="" class="btn btn-xs rounded-3" data-bs-toggle="menu">
			<div class="d-flex align-items-center gap-1">
				<b>{obj.role.value || 'нет'}</b>
				<i class="bi bi-chevron-expand"></i>
			</div>
		</button>
		<div class="menu border-0 shadow-sm rounded-3">
			{#each [null, ...Roles] as role}
				<button
					class="menu-item rounded-3"
					onclick={async () => {
						await addRoleToUser({ uid: obj.role.uid, role: role });
						await refreshAll();
					}}>{role || 'нет'}</button
				>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet nameSnippet(obj: { uid: string; name: { value: string } })}
	<div class="d-flex align-items-center justify-content-between gap-2 w-100">
		<div>{obj.name.value}</div>
		<button
			title=""
			class="btn btn-xs rounded-3"
			onclick={() => {
				userDialog.selected = {
					uid: obj.uid,
					name: users.find((u) => u.uid === obj.uid)?.name || ''
				};
				userDialog.isShowDialogName = true;
			}}
		>
			<i class="bi bi-gear"></i>
		</button>
	</div>
{/snippet}

<Column>
	<Table title="Пользователи" data={usersForTable} />
</Column>

<Dialog
	title="Изменить имя пользователя"
	bind:isShow={userDialog.isShowDialogName}
	onCancel={() => {
		userDialog.selected = {
			name: ''
		};
	}}
	onOk={async () => {
		if (userDialog.selected.uid) {
			let { status } = await changeUserName({
				uid: userDialog.selected.uid,
				name: userDialog.selected.name
			});
			if (status === 'ok') {
				toast({
					title: 'Сообщение',
					content: 'Имя успешно изменено!',
					bg: 'success',
					opacity: '10'
				});
			} else {
				toast({
					title: 'Ошибка',
					content: 'Произошла ошибка!',
					bg: 'danger',
					opacity: '10'
				});
			}
			await refreshAll();
		}
	}}
>
	<div>
		<div>Имя:</div>
		<input class="form-control form-control-sm rounded-3" bind:value={userDialog.selected.name} />
	</div>
</Dialog>
