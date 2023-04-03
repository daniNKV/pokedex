import { getPokemon, getPokemonSpecie, getPokemonSprite, getPokemons} from './api/pokemon.js';
import { fillPage, } from './ui/home.js';
import { initializePagination, handlePagination } from './ui/pagination.js';
import { hidePokemons } from './ui/dom.js';
import { showPokemon, handleNavigation } from './ui/pokemon.js';

async function initialize() {
    const FIRST_PAGE = 1;
    const pokemons = await getPokemons(FIRST_PAGE);

    fillPage(pokemons, getPokemonSprite);
    initializePagination(Math.ceil(pokemons.count / 20));
}

async function initializePokemon(e) {
    const ID = e.target.dataset.id;
    const pokemonBasic = await getPokemon(ID);
    const pokemonSpecie = await getPokemonSpecie(ID);

    hidePokemons();
    showPokemon(pokemonBasic, pokemonSpecie);

    document.getElementById('nav-info').onclick = handleNavigation    
}

document.addEventListener('load', initialize());
document.getElementById('pagination').addEventListener('click', (e) => handlePagination(e, { getPokemonsPage, getPokemonSprite, fillPage }));
document.getElementById('pokemons').addEventListener('click', (e) => initializePokemon(e));
