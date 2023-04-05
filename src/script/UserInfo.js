export default class UserInfo {
	constructor({ name, info }) {
		this._name = name;
		this._info = info;
	}
	getUserInfo() {
		return {
			data: this._name.textContent,
			about: this._info.textContent
		}
	}
	setUserInfo(data) {
		this._name.textContent = data.name;
		this._info.textContent = data.about;
	}
}