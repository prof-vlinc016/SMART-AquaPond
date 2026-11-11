import { compare, hash } from "bcrypt";
import { PasswordHasher } from "../../../modules/auth/contracts/password-hasher.js";

export class BcryptPasswordHasher implements PasswordHasher {
    hash(plainPassword: string): Promise<string> {
        return hash(plainPassword, 12);
    }

    verify(plainPassword: string, hashPassword: string): Promise<boolean> {
        return compare(plainPassword, hashPassword);
    }
}
