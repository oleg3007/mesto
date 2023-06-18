export default class Section {
	constructor(data, continer) {
		this._renderer = data;
		this._continer = continer;
	}

	renderItems(data) {
		this._renderer(data.name, data.link, data.likes.length);
	}
	addItem(element) {
		this._continer.prepend(element)
	}

}