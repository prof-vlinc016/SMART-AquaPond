import { User } from "../entities/User.js";

export interface UserRepository {
	findById(id: number): Promise<User | null>;
	findAll(): Promise<User[]>;
	update(user: User): Promise<void>;
}
