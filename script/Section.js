export default class Section {
	constructor({ items, renderer }, selectorContiner) {
		this._items = items;
		this._renderer = renderer;
		this._selectorContiner = selectorContiner;
	}

	addElement() {
		this._items.forEach((data) => {
			this._renderer(data.name, data.link);
		})
	}
	addItem(element) {
		this._selectorContiner.prepend(element)
	}

}