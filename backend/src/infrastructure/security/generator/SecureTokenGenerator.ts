import { randomBytes } from "node:crypto";
import { RandomTokengenerator } from "../../../core/contracts/random-token-generator.js";

export class SecureTokenGenerator implements RandomTokengenerator {
	generate(byteLength: number = 64): string {
		return randomBytes(64).toString("base64url");
	}
}
