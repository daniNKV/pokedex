import {
    showPaginationError, showButton, hideButton, setCurrent,
} from './dom.js';

function checkError(value, totalPages) {
    return Number.isInteger(value) && (value > 0 && value <= totalPages);
}

function setPreviousPage(actual = 1, last = 1, seek) {
    const FIRST = 1;
    const penultimate = last - 1;
    const previousPage = actual - 1;

    if (previousPage === FIRST) hideButton('previous-button');
    else if (previousPage === penultimate) showButton('next-button');

    seek(previousPage)
        .then(() => setCurrent(previousPage));
}

function setNextPage(actual = 1, last = 1, seek) {
    const FIRST = 1;
    const nextPage = actual + 1;

    if (nextPage === last) hideButton('next-button');
    else if (actual === FIRST) showButton('previous-button');

    seek(nextPage)
        .then(() => setCurrent(nextPage));
}

function goToPage(destination = 1, last = 1, seek) {
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

    seek(destination)
        .then(() => setCurrent(destination));
}

export function initializePagination(totalPages) {
    const FIRST_PAGE = 1;
    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('previous-button').classList.add('hidden');
    setCurrent(FIRST_PAGE);
}

export function handlePagination(event, callbacks) {
    event.preventDefault();
    const { getPokemons, updatePokemons } = callbacks;
    const actualPage = Number(document.getElementById('pagination').dataset.selected);
    const totalPages = Number(document.getElementById('total-pages').textContent);
    const buttonClicked = event.target.dataset.button;
    async function seek(page) {
        const pokemons = await getPokemons(page);
        updatePokemons(pokemons);
    }

    if (buttonClicked === 'next') {
        setNextPage(actualPage, totalPages, seek);
    } else if (buttonClicked === 'previous') {
        setPreviousPage(actualPage, totalPages, seek);
    } else if (buttonClicked === 'seek') {
        const selection = Number(document.getElementById('page-selection').value);
        if (checkError(selection, totalPages)) {
            goToPage(selection, totalPages, seek);
        } else {
            showPaginationError();
        }
    }
}
