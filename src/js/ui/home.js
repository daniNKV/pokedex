import { capitalizeFirstLetter, getId, parseToThreeDigits } from '../utilities/utils.js';

function createPokemonTile(pokemon, sprite) {
    const $template = document.getElementById('tile-template').content.cloneNode(true);

    const { name, url } = pokemon;
    const ID = getId(url);
    
    $template.querySelector('p').textContent = capitalizeFirstLetter(name);
    $template.querySelector('img').src = sprite(ID);
    $template.querySelector('img').alt = capitalizeFirstLetter(name);
    $template.querySelector('img').onerror = function() {
        this.onerror = null;    
        this.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parseToThreeDigits(ID)}.png`
    }           
    $template.querySelector('img').dataset.id = ID;
    $template.querySelector('div').dataset.id = ID;
    
    return $template;
}

function append($pokemon) {
    const $pokemons = document.getElementById('pokemons');
    $pokemons.appendChild($pokemon);
}

export function fillPage(pokemons, sprites) {
    document.getElementById('pokemons').innerHTML = "";
    pokemons.results.forEach(pokemon => append(createPokemonTile(pokemon, sprites)));
}

