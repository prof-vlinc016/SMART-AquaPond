import { AppQuery } from "../../../core/types/app-query.js";

export class MySqlQueryNormalizer {
	constructor() {}

	static normalizeQueryParam(query: AppQuery) {
		const conditions: string[] = [];
		const params: any[] = [];

		const ignoredProperty: (keyof AppQuery)[] = [
			"search",
			"sort",
			"order",
			"page",
			"limit",
		];

		let sql: string = "";

		for (const key in query) {
			if (ignoredProperty.includes(key as keyof AppQuery)) {
				continue;
			}

			const value = query[key as keyof AppQuery];

			if (Array.isArray(value)) {
				const { sql: inSql, params: inParams } = this.buildInClause(
					key,
					value,
				);

				conditions.push(inSql);
				params.push(...inParams);

				continue;
			}

			if (value) {
				conditions.push(`${key} = ?`);
				params.push(value);
			}
		}

		if (query.search) {
			const { sql: searchSql, params: searchParams } =
				this.buildSearchSql(query.search);

			conditions.push(searchSql);
			params.push(...searchParams);
		}

		if (conditions.length !== 0) {
			sql += `WHERE ${conditions.join(" AND ")}`;
		}

		if (query.sort) {
			sql += ` ORDER BY ${query.sort} ${query.order}`;
		}

		if (query.limit) {
			sql += " LIMIT ? OFFSET ?";
			const offset = (query.page - 1) * query.limit;

			params.push(query.limit);
			params.push(offset);
		}

		return {
			sql,
			params,
		};
	}

	private static buildInClause(key: string, values: any[]) {
		const conditions: string[] = [];
		const params: any[] = [];

		for (const value of values) {
			if (typeof value === "string" || typeof value === "number") {
				conditions.push("?");
				params.push(value);
			}
		}

		const sql = `${key} IN (${conditions.join(", ")})`;

		return {
			sql,
			params,
		};
	}

	private static buildSearchSql(search: AppQuery["search"]) {
		const conditions: string[] = [];
		const params: any[] = [];

		for (const key in search) {
			const value = search[key];

			const { sql: inSql, params: inParams } = this.buildInClause(
				key,
				value,
			);

			conditions.push(inSql);
			params.push(...inParams);
		}

		const sql = `(${conditions.join(" OR ")})`;

		return {
			sql,
			params,
		};
	}
}
