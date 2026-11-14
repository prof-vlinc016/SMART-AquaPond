import { ImageFile } from "../types/image-file.js";

export interface ImageStorage {
	upload(file: ImageFile, directory: string): Promise<string>;
	delete(filepath: string): Promise<void>;
}
