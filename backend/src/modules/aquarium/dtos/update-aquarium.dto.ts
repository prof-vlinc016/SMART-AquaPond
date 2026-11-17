import { CreateAquariumInput } from "./create-aquarium.dto.js";

export type UpdateAquariumInput = CreateAquariumInput & {
	id: number;
};
