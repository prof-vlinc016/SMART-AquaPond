import { AquariumRepository } from "../contracts/aquarium-repository.js";
import { AquariumNotFoundError } from "../errors/AquariumNotFoundError.js";

export class GetAquariumUsecase {
	constructor(private readonly aquariumRepository: AquariumRepository) {}

	async execute(id: number) {
		const aquarium = this.aquariumRepository.findById(id);

		if (!aquarium) {
			throw new AquariumNotFoundError();
		}

		return aquarium;
	}
}
