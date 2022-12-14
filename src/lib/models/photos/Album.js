export class Album {
	constructor(
		title = '',
		description = null,
		date = new Date(Date.now()),
		photos = new Array(),
		cover = null
	) {
		this.title = title;
		this.description = description;
		this.date = `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}-${
			date.getDate() < 10 ? '0' : ''
		}${date.getDate()}`;
		this.photos = photos;
		this.cover = cover;
	}
}
