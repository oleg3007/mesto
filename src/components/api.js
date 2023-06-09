export const getItems = () => {
	return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
		headers: {
			authorization: '73b60fe0-86c3-4e99-8da2-b793d15f38ab'
		}
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
		})
}

export const getCards = () => {
	return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
		headers: {
			authorization: '73b60fe0-86c3-4e99-8da2-b793d15f38ab'
		}
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
		})
}

export const toSentCards = () => {
	return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
		method: 'PATCH',
		headers: {
			authorization: '73b60fe0-86c3-4e99-8da2-b793d15f38ab',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({})
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
		})
}
