<script lang="ts">
	import Column from '#lib/components/Column.svelte';
	import { Roles, type TRole } from '#lib/models/Role.ts';
	import { addRoleToUser, changeUserName, getUsers } from '#lib/remoutes/firebase-admin.remote.ts';
	import { Table } from '@gorbulevsv/table';

	let users = $derived(await getUsers());
	let usersForTable = $derived(
		users.map((u) => {
			const { uid, email, name, picture, customClaims, ...rest } = u; // убираем uid
			return {
				picture: {
					snippet: pictureSnippet,
					url: picture
				},
				name,
				email,
				role: {
					snippet: roleSnippet,
					uid: uid,
					value: customClaims?.role
				}
			};
		})
	);
	let selectedUser = $state<{} | null>(null);
	let { data } = $props();
</script>

{#snippet pictureSnippet(obj: { picture: { url?: string } })}
	<div class="d-flex flex-column gap-1 rounded-3 overflow-hidden">
		<img class="img-fluid rounded-3" src={obj.picture.url} alt="" />
	</div>
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
						window.location.href = '/admin/users';
					}}>{role || 'нет'}</button
				>
			{/each}
		</div>
	</div>
{/snippet}

<Column>
	<Table title="Пользователи" data={usersForTable} />
</Column>
