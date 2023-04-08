export function appendToMain($element) {
    const $main = document.getElementById('app');
    $main.appendChild($element);
    
}

function hidePokemonInformation() {
    document.getElementById('pokemon-info').remove();

}

function showPokemons() {
    document.getElementById('pokemons').classList.remove('hidden');
    document.getElementById('pagination').classList.remove('hidden');
    hidePokemonInformation();
}

export function showPokemonInformation() {
    document.getElementById('pokemon-info').classList.remove("hidden");
    document.getElementById('close').addEventListener('click', showPokemons);
}


export function hidePokemons() {
    document.getElementById('pokemons').classList.add('hidden');
    document.getElementById('pagination').classList.add('hidden');
}


export function showPaginationError(){
    const $element = document.getElementById('page-selection')
    const DELAY_IN_MS = 2000
    $element.style.borderColor = "red";
    setTimeout(() => {
        $element.style.borderColor = "initial";
    }, DELAY_IN_MS)
    
}

export function appendTags($element, $tagsElements) {
    $tagsElements.forEach($tag => $element.appendChild($tag));
}

export function hideButton(name){ 
    document.getElementById(name).classList.remove('absolute');
    document.getElementById(name).classList.add('hidden');

}

export function showButton(name) {
    document.getElementById(name).classList.add('absolute');
    document.getElementById(name).classList.remove('hidden');
}

export function setCurrent(page) {
    document.getElementById('pagination').dataset.selected = page;
    document.getElementById('page-selection').value = page;
}

