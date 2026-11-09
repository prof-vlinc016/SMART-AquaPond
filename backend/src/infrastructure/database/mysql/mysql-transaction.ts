import { Pool } from "mysql2/promise";

export function createTransaction(pool: Pool) {
	return async (pool: Pool, callback: CallableFunction) => {
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();

			const result = await callback(connection);

			await connection.commit();

			return result;
		} catch (error) {
		} finally {
			connection.release();
		}
	};
}
