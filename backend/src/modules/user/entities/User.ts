export class User {
	private constructor(
		public readonly id: number,
		public firstname: string,
		public lastname: string,
		public username: string,
		public email: string,
		public role: string,
	) {}

	static reconstitute(data: {
		id: number;
		firstname: string;
		lastname: string;
		username: string;
		email: string;
		role: string;
	}): User {
		return new User(
			data.id,
			data.firstname,
			data.lastname,
			data.username,
			data.email,
			data.role,
		);
	}

	updateProfile(data: {
		firstname: string;
		lastname: string;
		username: string;
	}): void {
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.username = data.username;
	}

	assignRole(role: string): void {
		this.role = role;
	}

	changeEmail(email: string): void {
		this.email = email;
	}
}
