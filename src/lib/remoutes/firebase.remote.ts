import type { IPost } from '#lib/models/Post.ts';
import type { ITag } from '#lib/models/Tag.ts';
import { db } from '#lib/settings/firebase.ts';
import { query } from '$app/server';
import { get, ref } from 'firebase/database';

export const getTags = query(async () => {
	return (await (await get(ref(db, '/tags'))).val()) as ITag[];
});

export const getPosts = query(async () => {
	return (await (await get(ref(db, '/posts'))).val()) as Record<string, IPost>;
});
