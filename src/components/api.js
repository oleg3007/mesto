export const getItems = () => {
	return fetch('https://mesto.nomoreparties.co/v1/cohort-69/users/me', {
		headers: {
			authorization: '636e7451-8f67-42b3-b1e1-363eac3d0122'
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
	return fetch('https://mesto.nomoreparties.co/v1/cohort-69/cards', {
		headers: {
			authorization: '636e7451-8f67-42b3-b1e1-363eac3d0122'
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

export const toSentProfile = (name, about) => {
	return fetch('https://mesto.nomoreparties.co/v1/cohort-69/users/me', {
		method: 'PATCH',
		headers: {
			authorization: '636e7451-8f67-42b3-b1e1-363eac3d0122',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			about
		})
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
		})
}
export const toSentAvatar = (avatar) => {
	return fetch('https://mesto.nomoreparties.co/v1/cohort-69/users/me/avatar', {
		method: 'PATCH',
		headers: {
			authorization: '636e7451-8f67-42b3-b1e1-363eac3d0122',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ avatar })
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(`Ошибка: ${res.status}`);
			}
		})
}