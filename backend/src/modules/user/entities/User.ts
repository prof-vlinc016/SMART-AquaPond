export class User {
	private constructor(
		public readonly id: number,
		public firstname: string,
		public lastname: string,
		public username: string,
		public email: string,
		public role: string,
		public profileImage: string | null,
	) {}

	static reconstitute(data: {
		id: number;
		firstname: string;
		lastname: string;
		username: string;
		email: string;
		role: string;
		profileImage: string | null;
	}): User {
		return new User(
			data.id,
			data.firstname,
			data.lastname,
			data.username,
			data.email,
			data.role,
			data.profileImage,
		);
	}

	updateProfile(data: {
		firstname?: string;
		lastname?: string;
		username?: string;
		profileImage?: string;
	}): void {
		this.firstname = data.firstname ?? this.firstname;
		this.lastname = data.lastname ?? this.lastname;
		this.username = data.username ?? this.username;
		this.profileImage = data.profileImage ?? this.profileImage;
	}

	assignRole(role: string): void {
		this.role = role;
	}

	changeEmail(email: string): void {
		this.email = email;
	}
}
