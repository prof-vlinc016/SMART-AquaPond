import { ListQuery } from "../../../core/types/list-query.js";
import { Aquarium } from "../entities/Aquarium.js";

export interface AquariumRepository {
	findById(aquariumId: number): Promise<Aquarium | null>;
	findAll(ListQuery: ListQuery): Promise<Aquarium[]>;
	create(aquarium: Aquarium): Promise<void>;
	update(aquarium: Aquarium): Promise<void>;
	getTotalAquarium(): Promise<number>;
}
