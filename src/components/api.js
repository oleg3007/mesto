export const getItems = () => {
	return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
		headers: {
			authorization: '73b60fe0-86c3-4e99-8da2-b793d15f38ab'
		}
	})
		.then(res => res.json())
		.then((result) => {
			console.log(result)
		})
}