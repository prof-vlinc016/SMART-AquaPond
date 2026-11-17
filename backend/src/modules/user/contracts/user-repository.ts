import { ListQuery } from "../../../core/types/list-query.js";
import { User } from "../entities/User.js";

export interface UserRepository {
	findById(id: number): Promise<User | null>;
	findAll(ListQuery: ListQuery): Promise<User[]>;
	insertProfileImage(userId: number, profileImage: string): Promise<void>;
	update(user: User): Promise<void>;
	getTotalUsers(): Promise<number>;
}
