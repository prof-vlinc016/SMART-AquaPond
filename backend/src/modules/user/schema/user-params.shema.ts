import zod from "zod";

export const userParamsSchema = zod.object(
	{
		id: zod.coerce
			.number("must be numeric.")
			.positive("must be a whole number."),
	},
	{
		error: "Params is required.",
	},
);

export type UserParams = zod.infer<typeof userParamsSchema>;