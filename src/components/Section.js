export default class Section {
	constructor({ items, renderer }, continer) {
		this._items = items;
		this._renderer = renderer;
		this._continer = continer;
	}

	renderItems() {
		this._items.forEach((data) => {
			this._renderer(data.name, data.link);
		})
	}
	addItem(element) {
		this._continer.prepend(element)
	}

}