export interface ResourceListItem {
    name: string;
    title: string;
    url: string;
    created: string;
    type: string;
}

export interface ResourceListResponse {
    count: number;
    next: string;
    previous: string;
    results: Array<ResourceListItem>;
}

export interface ResourceParam {
    name: string;
    value: string;
}

export interface PeopleDetails {
    name: string;
    height: number;
    mass: number;
    birth_year: string;
    gender: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    homeworld: string;
    films: Array<string>;
    species: Array<string>;
    vehicles: Array<string>;
    starships: Array<string>;
}

export interface PlanetDetails {
    name: string;
    rotation_period: number;
    orbital_period: number;
    diameter: number;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: number;
    population: number;
    films: Array<string>;
    residents: Array<string>;
}

export interface FilmDetails {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    population: number;
    characters: Array<string>;
    planets: Array<string>;
    species: Array<string>;
    vehicles: Array<string>;
    starships: Array<string>;
}

export interface SpeciesDetails {
    name: string;
    classification: string;
    designation: string;
    average_height: number;
    average_lifespan: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    homeworld: string;
    language: string;
    films: Array<string>;
    people: Array<string>;
}

export interface VehiclesDetails {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: number;
    consumables: string;
    vehicle_class: string;
    length: number;
    max_atmosphering_speed: number;
    crew: number;
    passengers: number;
    cargo_capacity: number;
    films: Array<string>;
    pilots: Array<string>;
}

export interface StarshipsDetails {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: number;
    length: number;
    max_atmosphering_speed: number;
    crew: number;
    passengers: number;
    cargo_capacity: number;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    films: Array<string>;
    pilots: Array<string>;
}
