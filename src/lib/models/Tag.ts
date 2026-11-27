export interface ITag {
	name: string;
	description: string;
	postUID?: string | null;
}

export function Tag(name = '', description = '', postUID = null): ITag {
	return {
		name,
		description,
		postUID
	};
}
