import { db } from '#lib/settings/firebase.ts';
import { query } from '$app/server';
import { get, ref } from 'firebase/database';

export const getTags = query(async () => {
	return await (await get(ref(db, '/tags'))).val();
});

export const getPosts = query(async () => {
	return await (await get(ref(db, '/posts'))).val();
});
