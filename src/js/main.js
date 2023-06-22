import { getPokemonSprite } from './services/api/pokemon.js';
import { getPokemons, getPokemon } from './services/pokemon.js';
import { initializePagination, handlePagination } from './ui/pagination.js';
import initializePokemons from './ui/home.js';
import initializePokemon from './ui/pokemon.js';

async function initialize() {
	const FIRST_PAGE = 1;
	const POKEMONS_PER_PAGE = 20;
	const pokemons = await getPokemons(FIRST_PAGE, POKEMONS_PER_PAGE);
	console.log(pokemons);
	// initializePokemons(pokemons, getPokemonSprite);
	initializePokemons(pokemons);
	initializePagination(Math.ceil(pokemons.count / POKEMONS_PER_PAGE));
}

document.addEventListener('load', initialize());
document.getElementById('pagination').addEventListener('click', (e) => handlePagination(e, { getPokemons, getPokemonSprite, fillPage }));
document.getElementById('pokemons').addEventListener('click', (e) => initializePokemon(e, getPokemon));
