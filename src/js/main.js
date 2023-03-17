async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokemons = await response.json();

    return pokemons;
}


async function getPageOfPokemons(page) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
    const pokemons = await response.json();

    return pokemons;
}


async function initialize() {
    const pokemons = await getPokemons();
    setActualPage(1);
    fillPage(pokemons);
    initializePagination(Math.ceil(pokemons.count / 20));

}


function fillPage(pokemons) {
    document.getElementById('pokemons-list').innerHTML = "";
    pokemons.results.forEach(pokemon => appendPokemon(createPokemonTile(pokemon)));
}


function appendPokemon($pokemon) {
    const $list = document.getElementById('pokemons-list');
    $list.appendChild($pokemon);
}


function createPokemonTile(pokemon) {
    const $template = document.getElementById('tile-template').content.cloneNode(true);

    const { name, url } = pokemon;
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
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ID}.svg`;
}


// ################ PAGINATION ################


function initializePagination(numberOfPages) {
    document.getElementById('total-pages').textContent = numberOfPages;
    document.getElementById('previous-button').classList.add('hidden');
}


function handlePagination(event) {
    event.preventDefault();

    const actualPage = Number(document.getElementById('pagination').dataset.selected);
    const totalPages = Number(document.getElementById('total-pages').textContent);
    const buttonClicked = event.target.dataset.button;
    // const pageInfo = {actualPage, totalPages }

    if (buttonClicked === "next") {
        goNextPage(actualPage, totalPages );

    } else if (buttonClicked === "previous") {
        goPreviousPage(actualPage, totalPages );

    } else if (buttonClicked === "seek"){
        const $selection = document.getElementById('page-selection')
        const destiny = Number($selection.value);

        checkError(destiny) ? goToPage(destiny, totalPages) : showError($selection);
    
    } 

}

async function seekPage(destinyPage) {
    const pokemons = await getPageOfPokemons(destinyPage);
    fillPage(pokemons);
}


function goPreviousPage(actual, total) {
    const first = 1;
    const destiny = actual - 1;

    destiny === first ? hideButton('previous-button') : ""; 
    destiny === total - 1 ? showButton('next-button') : ""; 
    
    seekPage(destiny);
    setActualPage(destiny);
}


function goNextPage(actual, total) {
    const first = 1;
    const destiny = actual + 1;
    
    destiny === total ? hideButton('next-button') : ""; 
    destiny === first + 1 ? showButton('previous-button') : ""; 

    seekPage(destiny);
    setActualPage(destiny);
}


function goToPage(destiny, total) {
    const first = 1;
    
    destiny === first ? hideButton('previous-button') : ""; 
    destiny === total ? hideButton('next-button') : ""; 

    destiny !== first ? showButton('previous-button') : "";
    destiny !== total ? showButton ('next-button') : "";
    
    seekPage(destiny);
    setActualPage(destiny);
}


function setActualPage(page) {
    document.getElementById('pagination').dataset.selected = page;
    document.getElementById('page-selection').value = page;
}


function hideButton(name){ 
    document.getElementById(`${name}`).classList.remove('absolute');
    document.getElementById(`${name}`).classList.add('hidden');

}


function showButton(name) {
    document.getElementById(`${name}`).classList.add('absolute');
    document.getElementById(`${name}`).classList.remove('hidden');
}


function checkError(value) {
    if (Number.isInteger(value) && (value > 0 && value <= 65)) {
        return true;
    }

    return false;
}


function showError($element){
    $element.style.borderColor = "red";
    
    setTimeout(() => {
        $element.style.borderColor = "initial";
    }, 2000)
    
}

// ################ EVENT LISTENERS ################ 

document.addEventListener('load', initialize());
document.getElementById('pagination').addEventListener('click', (e) => handlePagination(e));
