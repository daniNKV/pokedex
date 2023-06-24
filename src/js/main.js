import { getPokemons, getPokemon } from './services/pokemon.js';
import { initializePagination, handlePagination } from './ui/pagination.js';
import updatePokemonGrid from './ui/home.js';
import initializePokemon from './ui/pokemon.js';

export default function initialize() {
    const FIRST_PAGE = 1;
    const POKEMONS_PER_PAGE = 20;
    updatePokemonGrid(getPokemons)(FIRST_PAGE)
        .then(() => initializePagination(POKEMONS_PER_PAGE));

    document.getElementById('pagination').addEventListener('click', (e) => handlePagination(e, updatePokemonGrid(getPokemons)));
    document.getElementById('pokemons').addEventListener('click', (e) => initializePokemon(e, getPokemon));
}
