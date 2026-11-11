import zod from "zod";

export const createUserSchema = zod.object(
	{
		firstname: zod.string("First name is required."),
		lastname: zod.string("Last name is required."),
		username: zod.string("Username is is required."),
		email: zod.email("Invalid email format!"),
		password: zod
			.string("Password is required.")
			.min(8, "Password must be atleast 8 characters"),
	},
	{
		error: "Registration data is required.",
	},
);
