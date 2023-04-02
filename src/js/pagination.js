import { showPaginationError, showButton, hideButton, setCurrent } from './dom.js';
import { checkError } from './utils.js';

export function initializePagination(totalPages) {
    const FIRST_PAGE = 1;
    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('previous-button').classList.add('hidden');
    setCurrent(FIRST_PAGE);
}

export function handlePagination(event, callbacks) {
    event.preventDefault();
    const actualPage = Number(document.getElementById('pagination').dataset.selected);
    const totalPages = Number(document.getElementById('total-pages').textContent);
    const buttonClicked = event.target.dataset.button;
    if (buttonClicked === "next") {
        setNextPage(actualPage, totalPages, callbacks);

    } else if (buttonClicked === "previous") {
        setPreviousPage(actualPage, totalPages, callbacks);

    } else if (buttonClicked === "seek"){
        const selection = Number(document.getElementById('page-selection').value)
        checkError(selection) ? goToPage(selection, totalPages, callbacks) : showPaginationError();
    } 
}

async function seekPage(destinyPage, callbacks) {
    const { getPokemonsPage, getPokemonSprite, fillPage } = callbacks;
    const pokemons = await getPokemonsPage(destinyPage);
    fillPage(pokemons, getPokemonSprite);
}

function setPreviousPage(actual, total, callbacks) {
    const first = 1;
    const previousPage = actual - 1;

    previousPage === first ? hideButton('previous-button') : ""; 
    previousPage === total - 1 ? showButton('next-button') : ""; 
    
    seekPage(previousPage, callbacks);
    setCurrent(previousPage);
}

function setNextPage(actual, total, callbacks) {
    const first = 1;
    const nextPage = actual + 1;
    
    nextPage === total ? hideButton('next-button') : ""; 
    nextPage === first + 1 ? showButton('previous-button') : ""; 

    seekPage(nextPage, callbacks);
    setCurrent(nextPage);
}

function goToPage(destination, total, callbacks) {
    const first = 1;
    
    destination === first ? hideButton('previous-button') : ""; 
    destination === total ? hideButton('next-button') : ""; 

    destination !== first ? showButton('previous-button') : "";
    destination !== total ? showButton('next-button') : "";
    
    seekPage(destination, callbacks);
    setCurrent(destination);
}

