import BaseEntity from './BaseEntity';

class LoginEntity extends BaseEntity {
	constructor() {
		super();
		this.fullname = null;
		this.password = null;
		this.email = null;
		this.gender = null;
		this.avatar = null;
	}
}
export default LoginEntity;