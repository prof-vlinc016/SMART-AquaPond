import { User } from "../entities/User.js";

export interface UserRepository {
	findById(id: number): Promise<User | null>;
	findAll(): Promise<User[]>;
	insertProfileImage(userId: number, profileImage: string): Promise<void>;
	update(user: User): Promise<void>;
}
