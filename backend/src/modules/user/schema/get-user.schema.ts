import zod from "zod";

export const userQuerySchema = zod.object({
	search: zod
		.string()
		.nullable()
		.default(null)
		.transform((value) =>
			value === null
				? null
				: {
						first_name: value.split("+"),
						last_name: value.split("+"),
					},
		),
	sort: zod.string().nullable().default(null),
	order: zod
		.enum(["asc", "desc"])
		.default("asc")
		.transform((value) => value.toUpperCase()),
	page: zod.coerce
		.number("must be a number.")
		.positive("must be a whole number.")
		.default(1),
	limit: zod.coerce
		.number("must be a number.")
		.positive("must be a whole number.")
		.default(10),
});

export type UserQuery = zod.infer<typeof userQuerySchema>;
