<script lang="ts">
	import Column from '#lib/components/Column.svelte';
	import { Roles, type TRole } from '#lib/models/Role.ts';
	import { addRoleToUser, getUsers } from '#lib/remoutes/firebase-admin.remote.ts';
	import { refreshAll } from '$app/navigation';

	let { data } = $props();
	let users = $derived(await getUsers());
</script>

{#snippet srole(uid: string, role: TRole | null)}
	<div>
		<button title="" class="btn btn-sm rounded-3" data-bs-toggle="menu">
			<div class="d-flex align-items-center gap-1">
				<b>{role || 'нет'}</b>
				<i class="bi bi-chevron-expand"></i>
			</div>
		</button>
		<div class="menu border-0 shadow-sm rounded-3">
			{#each [null, ...Roles] as role}
				<button
					class="menu-item rounded-3"
					onclick={async () => {
						await addRoleToUser({ uid: uid, role: role });
						await refreshAll();
					}}>{role || 'нет'}</button
				>
			{/each}
		</div>
	</div>
{/snippet}

<Column>
	<div>
		<h4>Список пользователей</h4>
		<div class="d-flex flex-column gap-1">
			<div class="d-flex align-items-center gap-8 bg-1 px-2 py-1">
				<div class="w-25">uid</div>
				<div class="w-25">email</div>
				<div class="w-25">name</div>
				<div class="w-25">role</div>
			</div>
			{#each users as user}
				<div class="d-flex align-items-center gap-8 bg-1 bg-40 px-2 py-1">
					<div class="w-25 text-wrap">{user.uid}</div>
					<div class="w-25">{user.email}</div>
					<div class="w-25">{user.name}</div>
					<div class="w-25 d-flex align-items-center gap-5">
						{@render srole?.(user.uid, user.customClaims?.['role'])}

						{#if data.user?.uid === user.uid}
							<div class="badge bg-info bg-20 rounded-3">Текущий пользователь</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Column>
