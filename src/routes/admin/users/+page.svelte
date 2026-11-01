<script lang="ts">
	import Column from '#lib/components/Column.svelte';
	import { Roles } from '#lib/models/Role.ts';
	import { addRoleToUser } from '#lib/remoutes/firebase-admin.remote.ts';
	import { refreshAll } from '$app/navigation';

	let { data } = $props();
</script>

<Column>
	<div>Текущий пользователь: <b>{data.user?.name}</b> с ролью <b>{data.user?.role}</b></div>
	<div class="d-flex align-items-center gap-2">
		<div>Изменить роль пользователя</div>
		<div>
			<button title="" class="btn btn-sm rounded-3" data-bs-toggle="menu">
				<div class="d-flex align-items-center gap-1">
					<b>{data.user?.role}</b>
					<i class="bi bi-chevron-expand"></i>
				</div>
			</button>
			<div class="menu border-0 shadow-sm rounded-3">
				{#each Roles as role}
					<button
						class="menu-item rounded-3"
						onclick={async () => {
							if (data.user?.uid) {
								await addRoleToUser({ uid: data.user?.uid, role: role });
								await refreshAll();
							}
						}}>{role}</button
					>
				{/each}
			</div>
		</div>
	</div>
</Column>
