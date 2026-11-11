export class AuthUser {
	private constructor(
		public readonly id: number,
		public readonly firstname: string,
		public readonly lastname: string,
		public readonly username: string,
		public readonly email: string,
		public readonly password: string,
		public readonly role: string,
	) {}

	static create(
		firstname: string,
		lastname: string,
		username: string,
		email: string,
		password: string,
	) {
		return new AuthUser(
			0,
			firstname,
			lastname,
			username,
			email,
			password,
			"OPERATOR",
		);
	}

	static reconstitute(data: {
		id: number;
		firstname: string;
		lastname: string;
		username: string;
		email: string;
		password: string;
		role: string;
	}) {
		return new AuthUser(
			data.id,
			data.firstname,
			data.lastname,
			data.username,
			data.email,
			data.password,
			data.role,
		);
	}
    
}
