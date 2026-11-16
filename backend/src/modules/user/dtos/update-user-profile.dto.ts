import { ImageFile } from "../../../core/types/image-file.js";

export type UpdateUserProflieInput = {
	id: number;
	firstname: string;
	lastname: string;
	username: string;
	profileImage: ImageFile | null
};
