export interface ICover {
	image: string | null;
	video: string | null;
}

export function Cover(image = null, video = null): ICover {
	return {
		image,
		video
	};
}
