import { RoleSchema } from '#lib/models/Role.ts';
import { adminAuth } from '#lib/settings/firebase-admin.ts';
import { command, getRequestEvent, query } from '$app/server';
import type { User } from 'firebase/auth';
import * as v from 'valibot';

export const logInSession = command(v.string(), async (idToken) => {
	const { cookies } = getRequestEvent();

	try {
		// Создаём session cookie на 5 дней
		const sessionCookie = await adminAuth.createSessionCookie(idToken, {
			expiresIn: 5 * 24 * 60 * 60 * 1000
		});

		cookies.set('session', sessionCookie, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 5 * 24 * 60 * 60
		});
	} catch {}
});

export const logOutSession = command(async () => {
	const { cookies } = getRequestEvent();
	try {
		cookies.delete('session', {
			path: '/',
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production'
		});
	} catch (error) {}
});

export const getUsers = query(async () => {
	const listUsersResult = await adminAuth.listUsers(1000); // макс. 1000 за раз
	return listUsersResult.users.map((user) => ({
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		picture: user.photoURL,
		customClaims: user.customClaims
	}));
});

export const addRoleToUser = command(
	v.object({ uid: v.string(), role: RoleSchema }),
	async (data) => {
		await adminAuth.setCustomUserClaims(data.uid, { role: data.role });
	}
);
