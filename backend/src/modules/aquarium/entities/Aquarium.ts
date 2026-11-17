export class Aquarium {
	private constructor(
		public readonly id: number,
		public name: string,
		public description: string,
		public location: string,
		public status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | string,
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

	update(data: { name: string; description: string; location: string }) {
		this.name = data.name ?? this.name;
		this.description = data.description ?? this.description;
		this.location = data.location ?? this.location;
	}
}
