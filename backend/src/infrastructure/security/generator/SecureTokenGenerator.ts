import { randomBytes } from "node:crypto";
import { RandomTokengenerator } from "../../../core/contracts/random-token-generator.js";

export class SecureTokenGenerator implements RandomTokengenerator {
	generate(byteLength: number): string {
		return randomBytes(byteLength).toString("base64url");
	}
}
