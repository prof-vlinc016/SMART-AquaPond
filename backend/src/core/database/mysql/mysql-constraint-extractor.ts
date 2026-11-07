import { MySqlError } from "./mysql-error.js";

export function extractConstraintName(error: MySqlError): string | null {
	const marker = "for key '";
	const start = error.sqlMessage.lastIndexOf(marker);

	if (start === -1) return null;

	const value = error.sqlMessage.slice(start + marker.length);
	const end = value.indexOf("'");

	if (end === -1) return null;

	return value.slice(0, end).split(".").pop() ?? null;
}
