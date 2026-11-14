import { Pool } from "mysql2/promise";
import { UserRepository } from "../contracts/user-repository.js";
import { User } from "../entities/User.js";
import { executor } from "../../../infrastructure/database/mysql/mysql-executor.js";

export class MysqlUserRepository implements UserRepository {
	constructor(private readonly db: Pool) {}

	async findById(id: number): Promise<User | null> {
		return executor(async () => {
			const [rows] = await this.db.execute(
				`
                SELECT
                    id,
                    first_name as firstname,
                    last_name as lastname,
                    username,
                    email,
                    role
                FROM users
                WHERE id = ?
                `,
				[id],
			);

			const users = rows as User[];

			return users[0] ? User.reconstitute(users[0]) : null;
		});
	}

	async findAll(): Promise<User[]> {
		return executor(async () => {
			const [rows] = await this.db.execute(
				`
                SELECT
                    id,
                    first_name as firstname,
                    last_name as lastname,
                    username,
                    email,
                    role
                FROM users
                `,
			);

			const users = rows as User[];

			return users.map((user) => User.reconstitute(user));
		});
	}

	async update(user: User): Promise<void> {
		return executor(async () => {
			await this.db.execute(
				`
                UPDATE users
                SET
                    first_name = ?,
                    last_name = ?,
                    username = ?,
                    email = ?,
                    role = ?
                WHERE id = ?
                `,
				[
					user.firstname,
					user.lastname,
					user.username,
					user.email,
					user.role,
					user.id,
				],
			);
		});
	}
}
