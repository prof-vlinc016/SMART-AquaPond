import { TransactionContext } from "./transaction-context.js";

export interface TransactionManager {
	execute<T>(
		callback: (transactionContext: TransactionContext) => Promise<T>,
	): Promise<T>;
}
