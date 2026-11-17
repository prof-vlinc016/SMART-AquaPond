import { AquariumRepository } from "../contracts/aquarium-repository.js";
import { UpdateAquariumInput } from "../dtos/update-aquarium.dto.js";
import { AquariumNotFoundError } from "../errors/AquariumNotFoundError.js";

export class UpdateAquariumUsecase {
	constructor(private readonly aquariumRepository: AquariumRepository) {}

	async execute(input: UpdateAquariumInput) {
		const aquarium = await this.aquariumRepository.findById(input.id);

		if (!aquarium) {
			throw new AquariumNotFoundError();
		}

		aquarium.update(input);

		await this.aquariumRepository.update(aquarium);
	}
}
