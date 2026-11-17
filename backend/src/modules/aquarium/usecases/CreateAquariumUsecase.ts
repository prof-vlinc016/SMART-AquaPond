import { AquariumRepository } from "../contracts/aquarium-repository.js";
import { CreateAquariumInput } from "../dtos/create-aquarium.dto.js";
import { Aquarium } from "../entities/Aquarium.js";

export class CreateAquariumUsecase {
	constructor(private readonly aquariumRepository: AquariumRepository) {}

	async execute(input: CreateAquariumInput) {
		const aquarium = Aquarium.create(input);
		await this.aquariumRepository.create(aquarium);
	}
}
