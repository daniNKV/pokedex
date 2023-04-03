import { showPaginationError, showButton, hideButton, setCurrent } from './dom.js';
import { checkError } from '../utils.js';

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
        checkError(selection, totalPages) ? goToPage(selection, totalPages, callbacks) : showPaginationError();
    } 
}

async function seekPage(page, callbacks) {
    const { getPokemons, getPokemonSprite, fillPage } = callbacks;
    const pokemons = await getPokemons(page);
    fillPage(pokemons, getPokemonSprite);
}

function setPreviousPage(actual, last, callbacks) {
    const FIRST = 1;
    const penultimate = last - 1;
    const previousPage = actual - 1;

    if (previousPage === FIRST) hideButton('previous-button');
    else if(previousPage === penultimate) showButton('next-button');

    seekPage(previousPage, callbacks);
    setCurrent(previousPage);
}

function setNextPage(actual, last, callbacks) {
    const FIRST = 1;
    const nextPage = actual + 1;

    if (nextPage === last) hideButton('next-button');
    else if (actual === FIRST) showButton('previous-button');
    
    seekPage(nextPage, callbacks);
    setCurrent(nextPage);
}

function goToPage(destination, last, callbacks) {
    const FIRST = 1;
    
    if (destination === FIRST) {
        hideButton('previous-button');
        showButton('next-button');
    } else if (destination === last) {
        hideButton('next-button');
        showButton('previous-button');
    } else {   
        showButton('previous-button');
        showButton('next-button');
    }

    seekPage(destination, callbacks);
    setCurrent(destination);
}

