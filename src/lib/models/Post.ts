import type { Colors } from './Colors';
import type { IComment } from './Comment';
import { Cover, type ICover } from './Cover';
import type { ITag } from './Tag';

export interface IPost {
	title: string;
	description: string | null;
	cover: ICover;
	content: string | null;
	created: string;
	published: boolean | null;
	pinned: boolean | null;
	inverted: boolean | null;
	tags: ITag[];
	comments: IComment[];
	userName: string | null;
	userUID: string | null;
	isHorisontal: boolean | null;
	isImageHeightFull: boolean | null;
	isHeightAuto: boolean | null;
	background: Colors | null;
}

export function Post(
	title = '',
	description = null,
	cover = Cover(),
	content = null,
	created = new Date().toISOString().slice(0, 10),
	published = true,
	pinned = null,
	inverted = null,
	tags: ITag[] = [],
	comments: IComment[] = [],
	userName = null,
	userUID = null,
	isHorisontal = null,
	isImageHeightFull = null,
	isHeightAuto = null,
	background = null
): IPost {
	return {
		title,
		description,
		cover,
		content,
		created,
		published,
		pinned,
		inverted,
		tags,
		comments,
		userName,
		userUID,
		isHorisontal,
		isImageHeightFull,
		isHeightAuto,
		background
	};
}
