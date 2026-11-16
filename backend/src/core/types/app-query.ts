export interface AppQuery {
	search: { [key: string]: string[] } | null;
	sort: string | null;
	order: string | "ASC" | "DESC";
	page: number;
	limit: number;
}
