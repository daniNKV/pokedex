import { showError, showButton, hideButton, setActualPage } from './dom.js';
import { checkError } from './utils.js';

export function initializePagination(numberOfPages) {
    document.getElementById('total-pages').textContent = numberOfPages;
    document.getElementById('previous-button').classList.add('hidden');
    setActualPage(1);
}

export function handlePagination(event, callbacks) {
    event.preventDefault();
    const actualPage = Number(document.getElementById('pagination').dataset.selected);
    const totalPages = Number(document.getElementById('total-pages').textContent);
    const buttonClicked = event.target.dataset.button;
    // const pageInfo = {actualPage, totalPages }
    if (buttonClicked === "next") {
        goNextPage(actualPage, totalPages, callbacks);

    } else if (buttonClicked === "previous") {
        goPreviousPage(actualPage, totalPages, callbacks);

    } else if (buttonClicked === "seek"){
        const $selection = document.getElementById('page-selection')
        const destiny = Number($selection.value);

        checkError(destiny) ? goToPage(destiny, totalPages, callbacks) : showError($selection);
    } 
}

async function seekPage(destinyPage, callbacks) {
    const { getPageOfPokemons, getPokemonSprite, fillPage } = callbacks;
    const pokemons = await getPageOfPokemons(destinyPage);
    fillPage(pokemons, getPokemonSprite);
}

function goPreviousPage(actual, total, callbacks) {
    const first = 1;
    const destiny = actual - 1;

    destiny === first ? hideButton('previous-button') : ""; 
    destiny === total - 1 ? showButton('next-button') : ""; 
    
    seekPage(destiny, callbacks);
    setActualPage(destiny);
}

function goNextPage(actual, total, callbacks) {
    const first = 1;
    const destiny = actual + 1;
    
    destiny === total ? hideButton('next-button') : ""; 
    destiny === first + 1 ? showButton('previous-button') : ""; 

    seekPage(destiny, callbacks);
    setActualPage(destiny);
}

function goToPage(destiny, total, callbacks) {
    const first = 1;
    
    destiny === first ? hideButton('previous-button') : ""; 
    destiny === total ? hideButton('next-button') : ""; 

    destiny !== first ? showButton('previous-button') : "";
    destiny !== total ? showButton ('next-button') : "";
    
    seekPage(destiny, callbacks);
    setActualPage(destiny);
}

