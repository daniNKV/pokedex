import {
	getPokemons as getPokemonsFromApi,
	getPokemon as getPokemonFromApi,
	getPokemonSpecie as getPokemonSpecieFromApi,
	getPokemonSprite,

} from './api/pokemon.js';

import {
	getPokemons as getPokemonsFromStorage,
	getPokemon as getPokemonFromStorage,
	savePokemons,
	savePokemon,
} from './storage/pokemon.js';

import { mapPokemon, mapPokemonList } from './mappers/pokemon.js';

const POKEMONS_LIMIT = 20;

export async function getPokemons(page, limit = POKEMONS_LIMIT) {
	let pokemons;

	try {
		return getPokemonsFromStorage(page);
	} catch (e) {
		const pokemonsApi = await getPokemonsFromApi(page);
		pokemons = mapPokemonList(pokemonsApi, getPokemonSprite);
		savePokemons(page, limit, pokemons);

		return pokemons;
	}
}

export async function getPokemon(id) {
	if (id === undefined) {
		throw new Error('No id provided');
	}

	let pokemon;

	try {
		pokemon = getPokemonFromStorage(id);
	} catch (e) {
		const main = await getPokemonFromApi(id);
		const specie = await getPokemonSpecieFromApi(id);
		pokemon = mapPokemon(main, specie, getPokemonSprite(id));
		savePokemon(id, pokemon);
	}

	return pokemon;
}
