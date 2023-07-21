export default class Api {
	constructor(config) {
		this._authorization = config.authorization;
		this._usersMy = config.usersMy;
		this._cards = config.cards;
		this._usersMyAvatar = config.usersMyAvatar;
	}
	_errorChecking(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
	}
	getServerUser() {
		return fetch(this._usersMy, {
			headers: { authorization: this._authorization }
		})
			.then(res => this._errorChecking(res))
	}
	getServerCard() {
		return fetch(this._cards, {
			headers: { authorization: this._authorization }
		})
			.then(res => this._errorChecking(res))
	}
	patchToSentProfile(data) {
		return fetch(this._usersMy, {
			method: 'PATCH',
			headers: {
				authorization: this._authorization,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
			.then(res => this._errorChecking(res))
	}
	patchToSentAvatar(data) {
		return fetch(this._usersMyAvatar, {
			method: 'PATCH',
			headers: {
				authorization: this._authorization,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ avatar: data.avatar })
		})
			.then(res => this._errorChecking(res))
	}
	toSentCard(name, link) {
		return fetch(this._cards, {
			method: 'POST',
			headers: {
				authorization: this._authorization,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, link })
		})
			.then(res => this._errorChecking(res))
	}
}
