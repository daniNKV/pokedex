import { getPokemonSprite } from './api/pokemon.js';
import { getPokemons, getPokemon } from './services/pokemon.js';
import { initializePagination, handlePagination } from './ui/pagination.js';
import { fillPage, } from './ui/home.js';
import  initializePokemon  from './ui/pokemon.js';

async function initialize() {
    const FIRST_PAGE = 1;
    const pokemons = await getPokemons(FIRST_PAGE);
    fillPage(pokemons, getPokemonSprite);
    initializePagination(Math.ceil(pokemons.count / 20));
}

document.addEventListener('load', initialize());
document.getElementById('pagination').addEventListener('click', (e) => handlePagination(e, { getPokemons, getPokemonSprite, fillPage }));
document.getElementById('pokemons').addEventListener('click', (e) => initializePokemon(e, getPokemon));
