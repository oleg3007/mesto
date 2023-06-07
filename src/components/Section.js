export default class Section {
	constructor(data, continer) {
		this._renderer = data;
		this._continer = continer;
	}

	renderItems(data) {
		this._renderer(data.name, data.link);
	}
	addItem(element) {
		this._continer.prepend(element)
	}

}