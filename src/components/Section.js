export default class Section {
constructor( {renderer}, continer) { 
		// this._items = items; 
		this._renderer = renderer; 
		this._continer = continer; 
	} 

	renderItems(datas) { 
		datas.forEach((data) => { 
			this._renderer(data); 
		}) 
	}
	addItem(element) {
		this._continer.prepend(element)
	}		
}