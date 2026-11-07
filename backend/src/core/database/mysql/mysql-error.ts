// A fallback, as QueryError can't be used for some reason
export interface MySqlError extends Error {
	code: string;
	errno: number;
	sqlState: string;
	sqlMessage: string;
}

export function IsMysqlError(error: unknown): error is MySqlError {
	return (
		error instanceof Error &&
		"code" in error &&
		"errno" in error &&
		"sqlState" in error &&
		"sqlMessage" in error
	);
}
