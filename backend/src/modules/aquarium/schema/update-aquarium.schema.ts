import z from "zod";

export const updateAquariumSchema = z.object(
    {
        name: z.string("is required!"),
        description: z.string("is required!"),
        location: z.string("is required!"),
    },
    { error: "Aquarium update details is required!" },
);

export type UpdateAquarium = z.infer<typeof updateAquariumSchema>;
