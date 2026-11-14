import zod from "zod";

export const updateUserProfileSchema = zod.object(
	{
		firstname: zod.string("First name is required."),
		lastname: zod.string("Last name is required."),
		username: zod.string("Username is is required."),
	},
	{
		error: "Profile details is required.",
	},
);

export type UpdateUser = zod.infer<typeof updateUserProfileSchema>;
