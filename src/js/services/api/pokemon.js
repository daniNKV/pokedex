const POKEMON_LIMIT = 20;
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemons(page, limit = POKEMON_LIMIT) {
	const response = await fetch(`${POKEMON_URL}?offset=${(page - 1) * 20}&limit=${limit}`);
	return response.json();
}

export async function getPokemon(id) {
	const response = await fetch(`${POKEMON_URL}/${id}`);
	return response.json();
}

export async function getPokemonSpecie(id) {
	const response = await fetch(`${POKEMON_URL}-species/${id}`);
	return response.json();
}

export function getPokemonSprite(id) {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}
