import { getPokemons, getPokemon } from './services/pokemon.js';
import { initializePagination, handlePagination } from './ui/pagination.js';
import updatePokemons from './ui/home.js';
import initializePokemon from './ui/pokemon.js';

export default async function initialize() {
    const FIRST_PAGE = 1;
    const POKEMONS_PER_PAGE = 20;
    const pokemons = await getPokemons(FIRST_PAGE, POKEMONS_PER_PAGE);
    const TOTAL_PAGES = () => Math.ceil(pokemons.total / POKEMONS_PER_PAGE);
    updatePokemons(pokemons);
    initializePagination(TOTAL_PAGES());
}

document.getElementById('pagination').addEventListener('click', (e) => handlePagination(e, { getPokemons, updatePokemons }));
document.getElementById('pokemons').addEventListener('click', (e) => initializePokemon(e, getPokemon));
