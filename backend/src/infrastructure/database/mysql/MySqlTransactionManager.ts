import { Pool } from "mysql2/promise";
import { TransactionManager } from "../../../core/database/contracts/transaction-manager.js";
import { TransactionContext } from "../../../core/database/contracts/transaction-context.js";
import { MySqlTransactionContext } from "./MySqlTransactionContext.js";

export class MySqlTransactionManager implements TransactionManager {
	constructor(private pool: Pool) {}

	async execute<T>(
		callback: (transactionContext: TransactionContext) => Promise<T>,
	): Promise<T> {
		const connection = await this.pool.getConnection();

		try {
			await connection.beginTransaction();

			const context = new MySqlTransactionContext(connection);

			const result = await callback(context);

			await connection.commit();

			return result;
		} catch (error) {
			await connection.rollback();
			throw error;
		} finally {
			connection.release();
		}
	}
}
