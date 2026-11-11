import { PoolConnection } from "mysql2/promise";
import { TransactionContext } from "../../../core/database/contracts/transaction-context.js";

export class MySqlTransactionContext implements TransactionContext {
	constructor(public readonly connection: PoolConnection) {}
}
