import { createHash } from "node:crypto";
import { RefreshTokenHasher } from "../../../modules/auth/contracts/refresh-token-hasher.js";

export class Sha256RefreshTokenHasher implements RefreshTokenHasher {
	hash(token: string): string {
		return createHash("sha256").update(token).digest("hex");
	}
}
