export class Aquarium {
	private constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly description: string,
		public readonly location: string,
		public readonly status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | string,
		public readonly createdAt?: string,
		public readonly updatedAt?: string,
	) {}

	static create(data: {
		name: string;
		description: string;
		location: string;
	}) {
		return new Aquarium(
			0,
			data.name,
			data.description,
			data.location,
			"ACTIVE",
		);
	}

	static reconstitute(data: {
		id: number;
		name: string;
		description: string;
		location: string;
		status: string;
		createdAt?: string;
		updatedAt?: string;
	}) {
		return new Aquarium(
			data.id,
			data.name,
			data.description,
			data.location,
			data.status,
			data.createdAt,
			data.updatedAt,
		);
	}
}
