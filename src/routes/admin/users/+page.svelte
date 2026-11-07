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
				name,
				photo: userPicture,
				email,
				...rest,
				role: customClaims?.role,
				роль: roleSnippet,
				picture,
				uid
			};
		})
	);
	let selectedUser = $state<{} | null>(null);
	let { data } = $props();
</script>

{#snippet userPicture(ob: { picture: string })}
	<img class="img-fluid rounded-3" src={ob.picture} alt="" />
{/snippet}

{#snippet roleSnippet(ob: { uid: string; role: TRole | null })}
	<div>
		<button title="" class="btn btn-xs rounded-3" data-bs-toggle="menu">
			<div class="d-flex align-items-center gap-1">
				<b>{ob.role || 'нет'}</b>
				<i class="bi bi-chevron-expand"></i>
			</div>
		</button>
		<div class="menu border-0 shadow-sm rounded-3">
			{#each [null, ...Roles] as role}
				<button
					class="menu-item rounded-3"
					onclick={async () => {
						await addRoleToUser({ uid: ob.uid, role: role });
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
