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
                    first_name AS firstname,
                    last_name AS lastname,
                    username,
                    email,
                    role,
					profile_image AS profileImage
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
                    first_name AS firstname,
                    last_name AS lastname,
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

	async insertProfileImage(
		userId: number,
		profileImage: string,
	): Promise<void> {
		return executor(async () => {
			await this.db.execute(
				`
				INSERT INTO users(
					profile_image
				) VALUES (?)
				WHERE id = ?
				`,
				[userId, profileImage],
			);
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
                    role = ?,
					profile_image = ?
                WHERE id = ?
                `,
				[
					user.firstname,
					user.lastname,
					user.username,
					user.email,
					user.role,
					user.profileImage,
					user.id,
				],
			);
		});
	}
}
