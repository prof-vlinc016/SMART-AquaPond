export type AuthResult = {
	user: {
		id: number;
		role: string;
	};
	refreshToken: string;
	accessToken: string;
};
