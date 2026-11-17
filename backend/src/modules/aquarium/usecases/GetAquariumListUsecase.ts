import { AquariumRepository } from "../contracts/aquarium-repository.js";
import { AquariumQuery } from "../dtos/get-aquarium-query.dto.js";

export class GetAquariumListUsecase {
	constructor(private readonly aquariumRepository: AquariumRepository) {}

    async execute(aquariumQuery: AquariumQuery) {
        const aquariumList = await this.aquariumRepository.findAll(aquariumQuery);
		const totalAquarium = await this.aquariumRepository.getTotalAquarium();
		const totalPages = Math.ceil(totalAquarium / aquariumQuery.limit);

		return {
			items: aquariumList,
			totalItems: totalAquarium,
			totalPages: totalPages,
			hasMore: aquariumQuery.page < totalPages,
		};
    }
}
