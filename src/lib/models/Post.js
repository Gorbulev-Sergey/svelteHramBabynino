export class Post {
	constructor(
		title = null,
		cover = new Cover(),
		description = null,
		content = null,
		created = new Date(Date.now()),
		published = true,
		pinned = null,
		inverted = null,
		tags = new Array(),
		comments = new Array(),
		userUID = null,
		isHorisontal = null
	) {
		this.title = title;
		this.cover = cover;
		this.description = description;
		this.content = content;
		this.created = `${created.getFullYear()}-${created.getMonth() < 10 ? '0' : ''}${
			created.getMonth() + 1
		}-${created.getDate() < 10 ? '0' : ''}${created.getDate()}`;
		this.published = published;
		this.pinned = pinned;
		this.inverted = inverted;
		this.tags = tags;
		this.comments = comments;
		this.userUID = userUID;
		this.isHorisontal = isHorisontal;
	}
}

export class Cover {
	constructor(image = null, video = null) {
		this.image = image;
		this.video = video;
	}
}
