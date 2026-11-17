import z from "zod";

export const aquariumParamSchema = z.object(
	{
		id: z.coerce
			.number("must be a number")
			.positive("must be a positive number"),
	},
	{ error: "Invalid route parameters!" },
);

export type AquariumParam = z.infer<typeof aquariumParamSchema>;
