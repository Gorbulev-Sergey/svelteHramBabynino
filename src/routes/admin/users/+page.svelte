<script lang="ts">
	import Column from '#lib/components/Column.svelte';
	import { Roles, type TRole } from '#lib/models/Role.ts';
	import { addRoleToUser, changeUserName, getUsers } from '#lib/remoutes/firebase-admin.remote.ts';
	import { refreshAll } from '$app/navigation';

	let users = $derived(await getUsers());
	let selectedUser = $state<{} | null>(null);
	let { data } = $props();
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
			<div class="d-flex align-items-center gap-8 bg-1 px-3 py-1">
				<div class="w-50">name</div>
				<div class="w-25">email</div>
				<div class="w-10">role</div>
				<div class="w-25">uid</div>
			</div>
			{#each users as user}
				<div
					class="d-flex align-items-center gap-8 {data.user?.uid === user.uid
						? 'bg-info bg-20'
						: 'bg-1 bg-30'} px-3 py-1"
				>
					<div class="w-50">
						<div class="w-100 d-flex align-items-center gap-1">
							{#if selectedUser?.uid !== user.uid}
								<div class="">
									<b class="text-nowrap">
										{user.name}
									</b>
									{#if data.user?.uid === user.uid}
										<div class="badge bg-info bg-20 rounded-3 ms-2">Текущий пользователь</div>
									{/if}
								</div>

								<div class=" flex-grow-1 d-flex justify-content-end">
									<button
										title=""
										class="btn-icon btn-sm"
										onclick={() => {
											selectedUser = user;
										}}
									>
										<i class="bi bi-pencil-fill"></i>
									</button>
								</div>
							{:else}
								<div class="d-flex align-items-center gap-1 w-100">
									<div class="flex-grow-1">
										<input
											class="form-control form-control-sm rounded-3 bg-20"
											bind:value={selectedUser.name}
										/>
									</div>
									<button
										title=""
										class="btn-icon btn-sm rounded-3"
										onclick={() => (selectedUser = null)}
									>
										<i class="bi bi-arrow-90deg-left"></i>
									</button>
									<button
										title=""
										class="btn-icon btn-solid theme-inverse btn-sm rounded-3"
										onclick={async () => {
											await changeUserName({ uid: user.uid, name: selectedUser?.name });
											await refreshAll();
											selectedUser = null;
										}}
									>
										Ok
									</button>
								</div>
							{/if}
						</div>
					</div>
					<div class="w-25">{user.email}</div>
					<div class="w-10">
						{@render srole?.(user.uid, user.customClaims?.['role'])}
					</div>
					<div class="w-25 text-wrap">{user.uid}</div>
				</div>
			{/each}
		</div>
	</div>
</Column>
