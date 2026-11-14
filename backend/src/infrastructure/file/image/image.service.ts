import path from "path";
import { ImageStorage } from "../../../core/contracts/image-storage.js";
import { ValidationError } from "../../../core/errors/ValidationError.js";
import { ImageFile } from "../../../core/types/image-file.js";

export class ImageService implements ImageStorage {
	async upload(file: ImageFile, directory: string): Promise<string> {
		const errors: string[] = [];

		const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

		if (!allowedTypes.includes(file.mimetype)) {
			errors.push("Only JPEG, PNG, and WebP images are allowed.");
		}

		if (!(file.size < 5 * 1024 * 1024)) {
			errors.push("Image file too large! only up to 5mb is allowed");
		}

		if (errors.length !== 0) {
			throw new ValidationError("Image Validation failed", errors);
		}

		const uploadDir = path.join(`/uploads`, directory);

        const extension = path.extname(file.originalName);
        const fileName = `${crypto.randomUUID()}${extension}`;
        const filepath = path.join(uploadDir, fileName);

		return filepath;
	}

	async delete(filepath: string): Promise<void> {}
}
