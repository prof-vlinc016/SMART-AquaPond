import { AuthUser } from "../entities/AuthUser.js";

export interface IAuthUserRepository {
	findById(id: number): Promise<AuthUser | null>;
	findByEmail(email: string): Promise<AuthUser | null>;
	create(authUser: AuthUser): Promise<number>;
}
