
export function appendToMain($element) {
    const $main = document.getElementById('app');
    $main.appendChild($element);
    
}

function hidePokemonUI() {
    document.getElementById('pokemon-info').remove();

}

function showList() {
    document.getElementById('pokemons-list').classList.remove('hidden');
    document.getElementById('pagination').classList.remove('hidden');
    hidePokemonUI();
}

export function showPokemonUI() {
    document.getElementById('pokemon-info').classList.remove("hidden");
    document.getElementById('close').addEventListener('click', showList);
}


export function hideList() {
    document.getElementById('pokemons-list').classList.add('hidden');
    document.getElementById('pagination').classList.add('hidden');
}


export function showError($element){
    $element.style.borderColor = "red";
    
    setTimeout(() => {
        $element.style.borderColor = "initial";
    }, 2000)
    
}


export function appendTags($element, $tagsElements) {
    $tagsElements.forEach($tag => $element.appendChild($tag));
}

export function hideButton(name){ 
    document.getElementById(`${name}`).classList.remove('absolute');
    document.getElementById(`${name}`).classList.add('hidden');

}

export function showButton(name) {
    document.getElementById(`${name}`).classList.add('absolute');
    document.getElementById(`${name}`).classList.remove('hidden');
}


export function setActualPage(page) {
    document.getElementById('pagination').dataset.selected = page;
    document.getElementById('page-selection').value = page;
}

