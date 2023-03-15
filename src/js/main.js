async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokemons = await response.json()

    return pokemons;
}


async function fillPage() {
    const pokemons = await getPokemons();
    
    pokemons.results.forEach(pokemon => appendPokemon(createPokemonTile(pokemon)))
}


function appendPokemon($pokemon) {
    const $list = document.getElementById('pokemons-list');
    $list.appendChild($pokemon);
}


function createPokemonTile(pokemon) {
    const $template = document.getElementById('tile-template').content.cloneNode(true);

    const { name, url } = pokemon
    const ID = getID(url);
    
    $template.querySelector('p').textContent = capitalizeFirstLetter(name);
    $template.querySelector('img').src = getPokemonSprite(ID);
    $template.querySelector('div').dataset.id = ID;
    
    return $template;
}


function capitalizeFirstLetter(string) {
    return string[0].toUpperCase().concat(string.slice(1));
}


function getID(url) {
    const numbersRegex = /\d/g;
    return url.match(numbersRegex).slice(1).join("");
}


function getPokemonSprite(ID) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ID}.svg`
}

// ################ PAGINATION ################

function initializePagination() {

}


function handlePagination() {


}


// ################ EVENT LISTENERS ################ 

document.addEventListener('load', fillPage())

