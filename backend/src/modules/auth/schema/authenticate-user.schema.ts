import zod from "zod";

export const authenticateUserSchema = zod.object(
    {
        email: zod.email("Invalid email format!"),
        password: zod
            .string("Password is required.")
            .min(8, "Password must be atleast 8 characters"),
    },
    {
        error: "Authentication data is required.",
    },
);
