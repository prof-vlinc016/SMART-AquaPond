import { Pool } from "mysql2/promise";
import { ListQuery } from "../../../core/types/list-query.js";
import { AquariumRepository } from "../contracts/aquarium-repository.js";
import { Aquarium } from "../entities/Aquarium.js";
import { executor } from "../../../infrastructure/database/mysql/mysql-executor.js";
import { MySqlQueryNormalizer } from "../../../infrastructure/database/mysql/MySqlQueryNormalizer.js";

export class MySqlAquariumRepository implements AquariumRepository {
	constructor(private readonly db: Pool) {}

	findById(aquariumId: number): Promise<Aquarium | null> {
		return executor(async () => {
			const [rows] = await this.db.execute(
				`
                SELECT
                    id,
                    name,
                    description,
                    location,
                    status,
                    created_at AS createdAt,
                    updated_at AS updatedAt
                FROM aquariums
                WHERE id = ?
                `,
				[aquariumId],
			);

			const aquariums = rows as Aquarium[];

			return aquariums[0] ? Aquarium.reconstitute(aquariums[0]) : null;
		});
	}

	findAll(ListQuery: ListQuery): Promise<Aquarium[]> {
		return executor(async () => {
			const { sql, params } =
				MySqlQueryNormalizer.normalizeQueryParam(ListQuery);

			const [rows] = await this.db.execute(
				`
                SELECT
                    id,
                    name,
                    description,
                    location,
                    status,
                    created_at AS createdAt,
                    updated_at AS updatedAt
                FROM aquariums
                ${sql}
                `,
				params,
			);

			const aquariums = rows as Aquarium[];

			return aquariums.map((aquarium) => Aquarium.reconstitute(aquarium));
		});
	}

	create(aquarium: Aquarium): Promise<void> {
		return executor(async () => {
			await this.db.execute(
				`
                INSERT INTO aquariums(
                    name,
                    description,
                    location
                ) VALUES (?, ?, ?);
                `,
				[aquarium.name, aquarium.description, aquarium.location],
			);
		});
	}

	update(aquarium: Aquarium): Promise<void> {
		return executor(async () => {
			await this.db.execute(
				`
                UPDATE aquariums
                SET 
                    name = ?,
                    description = ?,
                    location = ?
                    status = ?
                WHERE id = ?
                `,
				[
					aquarium.name,
					aquarium.description,
					aquarium.location,
					aquarium.status,
					aquarium.id,
				],
			);
		});
	}

	getTotalAquarium(): Promise<number> {
		return executor(async () => {
			const [rows] = await this.db.execute(
				`
                SELECT 
                    COUNT(id) as count
                FROM aquariums 
                `,
			);

			const aquariumCounts = rows as { count: number }[];

			return aquariumCounts[0] ? aquariumCounts[0].count : 0;
		});
	}
}
