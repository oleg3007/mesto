export default class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}
	_checkError(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
	}
	getServerUser() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		})
			.then(res => this._checkError(res))
	}
	getServerCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		})
			.then(res => this._checkError(res))
	}
	patchToSentProfile(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
			.then(res => this._checkError(res))
	}
	patchToSentAvatar(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({ avatar: data.avatar })
		})
			.then(res => this._checkError(res))
	}
	sendCard(name, link) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ name, link })
		})
			.then(res => this._checkError(res))
	}
	deleteCard(idCard) {
		return fetch(`${this._baseUrl}/cards/${idCard}`, {
			method: 'DELETE',
			headers: this._headers,
		})
			.then(res => this._checkError(res))
	}
	putLikeCard(idCard) {
		return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
			method: 'PUT',
			headers: this._headers,
		})
			.then(res => this._checkError(res))
	}
	deleteLikeCard(idCard) {
		return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		})
			.then(res => this._checkError(res))
	}
}
