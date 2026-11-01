<script lang="ts">
	import PageTitle from '#lib/components/PageTitle.svelte';
	import { addRoleToUser } from '#lib/remoutes/firebase-admin.remote.ts';
	import { refreshAll } from '$app/navigation';

	let { data } = $props();
</script>

<PageTitle><div class="bg-3 rounded-3 px-2">Панель администратора</div></PageTitle>

<button
	class="btn btn-sm rounded-3"
	onclick={async () => {
		if (data.user?.uid) {
			await addRoleToUser({ uid: data.user?.uid, role: 'admin' });
			await refreshAll();
		}
	}}>Добавить роль <b>admin</b></button
>
