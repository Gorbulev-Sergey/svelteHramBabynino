<script lang="ts">
	import { logInSession, logOutSession } from '#lib/remoutes/firebase-admin.remote.ts';
	import { auth } from '#lib/settings/firebase.ts';
	import { goto, refreshAll } from '$app/navigation';
	import { getIdToken, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
</script>

<div class="container my-4">
	<div class="d-flex align-items-center justify-content-between">
		<button
			class="btn btn-dark text-light"
			onclick={async () => {
				const result = await signInWithPopup(auth, new GoogleAuthProvider());
				const idToken = await getIdToken(result.user);

				await logInSession(idToken);
				await refreshAll();
				goto('/');
			}}>Войти с помощью Google</button
		>
		<button
			class="btn btn-dark text-light"
			onclick={async () => {
				await auth.signOut();
				await logOutSession();
				await refreshAll();
				goto('/');
			}}>Выйти</button
		>
	</div>
</div>
