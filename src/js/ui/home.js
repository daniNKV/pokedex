import { capitalizeFirstLetter, getID } from '../utils.js';

function createPokemonTile(pokemon, sprite) {
    const $template = document.getElementById('tile-template').content.cloneNode(true);

    const { name, url } = pokemon;
    const ID = getID(url);
    
    $template.querySelector('p').textContent = capitalizeFirstLetter(name);
    $template.querySelector('img').src = sprite(ID);
    $template.querySelector('img').dataset.id = ID;
    $template.querySelector('div').dataset.id = ID;
    
    return $template;
}

function appendPokemon($pokemon) {
    const $list = document.getElementById('pokemons-list');
    $list.appendChild($pokemon);
}

export function fillPage(pokemons, sprites) {
    document.getElementById('pokemons-list').innerHTML = "";
    pokemons.results.forEach(pokemon => appendPokemon(createPokemonTile(pokemon, sprites)));
}

