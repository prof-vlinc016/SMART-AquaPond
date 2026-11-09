import { translateMySqlError } from "./mysql-error-translator.js";

export async function executor<T>(operation: () => Promise<T>): Promise<T> {
    try {
        return await operation();
    } catch (error: unknown) {
        throw translateMySqlError(error);
    }
}