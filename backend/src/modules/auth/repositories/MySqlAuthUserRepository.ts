import { Pool, ResultSetHeader } from "mysql2/promise";
import { IAuthUserRepository } from "../contracts/auth-user-repository.js";
import { AuthUser } from "../entities/AuthUser.js";
import { executor } from "../../../infrastructure/database/mysql/mysql-executor.js";

export class MySqlAuthUserRepository implements IAuthUserRepository {
	constructor(private readonly db: Pool) {}

	async findById(id: number): Promise<AuthUser | null> {
		return executor(async () => {
			const [rows] = await this.db.execute(
				`
                SELECT
                    id,
                    first_name AS firstname,
                    last_name AS lastname,
                    username,
                    email,
                    password_hash AS password,
                    role
                FROM users
                WHERE id = ?
            `,
				[id],
			);

			const authUsers = rows as AuthUser[];

			return authUsers[0] ? AuthUser.reconstitute(authUsers[0]): null;
		});
	}

	async findByEmail(email: string): Promise<AuthUser | null> {
		return executor(async () => {
			const [rows] = await this.db.execute(
				`
                SELECT
                    id,
                    first_name AS firstname,
                    last_name AS lastname,
                    username,
                    email,
                    password_hash AS password,
                    role
                FROM users
                WHERE email = ?
            `,
				[email],
			);

			const authUsers = rows as AuthUser[];

			return authUsers[0] ? AuthUser.reconstitute(authUsers[0]): null;
		});
	}

	async create(authUser: AuthUser): Promise<number> {
		return executor(async () => {
			const [result] = await this.db.execute(
				`
                INSERT INTO users(
                    first_name,
                    last_name,
                    username,
                    email,
                    password_hash
                ) VALUES (?, ?, ?, ?, ?)
            `,
				[
					authUser.firstname,
					authUser.lastname,
					authUser.username,
					authUser.email,
					authUser.password,
				],
			);

			const insertResult = result as ResultSetHeader;

			return insertResult.insertId;
		});
	}
}
