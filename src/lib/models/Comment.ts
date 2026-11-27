export interface IComment {
	text: string;
	created: string;
	userUID: string | null;
	postUID: string | null;
}

export function Comment(text = '', created = '', userUID = null, postUID = null): IComment {
	return {
		text,
		created,
		userUID,
		postUID
	};
}
