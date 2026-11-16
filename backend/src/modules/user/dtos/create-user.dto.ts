import { ImageFile } from "../../../core/types/image-file.js"

export type CreateUserInput = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    profileImage: ImageFile | null
}