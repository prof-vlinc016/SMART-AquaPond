import { TransactionContext } from "../../../core/database/contracts/transaction-context.js";
import { AuthUser } from "../entities/AuthUser.js";

export interface IAuthUserRepository {
	findById(id: number): Promise<AuthUser | null>;
	findByEmail(email: string): Promise<AuthUser | null>;
	create(
		authUser: AuthUser,
		transactionContext: TransactionContext,
	): Promise<number>;
}
