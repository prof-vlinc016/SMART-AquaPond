import z from "zod";

export const createAquariumSchema = z.object(
	{
		name: z.string("is required!"),
		description: z.string("is required!"),
		location: z.string("is required!"),
	},
	{ error: "Aquarium creation details is required!" },
);

export type CreateAquarium = z.infer<typeof createAquariumSchema>;
