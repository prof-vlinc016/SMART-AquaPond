export interface PasswordHasher {
	hash(plainPassword: string): Promise<string>;
	verify(plainPassword: string, hashPassword: string): Promise<boolean>;
}
