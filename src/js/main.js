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


async function getPokemon(ID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
    const pokemon = await response.json();

    return pokemon;
}


async function getPokemonSpecie(ID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}`);
    const pokemon = await response.json();

    return pokemon;
}

// ################### MAIN ################### 


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
    $template.querySelector('img').dataset.id = ID;
    $template.querySelector('div').dataset.id = ID;
    
    return $template;
}


function getPokemonSprite(ID) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ID}.svg`;
}

// ################ POKEMON INFO ################

async function initializePokemon(e) {
    const ID = e.target.dataset.id;
    const pokemonBasic = await getPokemon(ID);
    const pokemonSpecie = await getPokemonSpecie(ID);
    hideList();
    appendSection(createSection());
    showPokemonInfo(ID, pokemonBasic, pokemonSpecie);
    
}
function showPokemonInfo(ID, basic, breeding) {
    // const color = breeding.color.name;
    makeHero(basic);
    makeAbout(basic);
    makeBreeding(breeding);
    // makeStats();
    showPokemonUI();
}


function makeBreeding(data) {
    const { egg_groups, gender_rate, growth_rate, habitat } = data;
    const items = { 
        Habitat: habitat.name, 
        ["Egg Groups"]: eggGroupsToString(egg_groups),
        ["Growth Rate"]: growth_rate.name
    }
    
    const $breeding = document.getElementById('breeding-info');
    appendItem($breeding, createGenderElement(getGenderProbability(gender_rate)));
    Object.entries(items).forEach(item => appendItem($breeding, createItem(item[0], capitalizeFirstLetter(item[1]))));
}


function createGenderElement(values) {
    const $genders = document.getElementById('gender-template').content.cloneNode(true);
    console.log(values)
    $genders.getElementById('mars').textContent = values[0] + "% ";
    $genders.getElementById('venus').textContent = values[1] + "% ";

    return $genders;
}


function makeAbout(data) {
    const { height, weight, abilities, base_experience } = data;
    const items = { 
        Experience: base_experience, 
        Height: height*10 + " cm (" + convertMetersToFeetAndInches(height/10) + ")", 
        Weight: weight/10 + " kg (" + convertKgToLb(weight/10).toFixed(2) + " lb)", 
        Abilities: abilitiesToString(abilities) };

    const $about = document.getElementById('basic-info');

    Object.entries(items).forEach(item => appendItem($about, createItem(item[0], item[1])))


}


function createSection() {
    const $section = document.getElementById('pokemon-info-template').content.cloneNode(true);

    return $section;
}


function createItem(name, value) {
    const $itemTemplate = document.getElementById('about-item-template').content.cloneNode(true);

    $itemTemplate.querySelector('h3').textContent = capitalizeFirstLetter(name);
    $itemTemplate.querySelector('p').textContent = value;

    return $itemTemplate;
}


function makeHero(data) {
    const {name, id, sprites, types} = data;
    const $name = document.getElementById('pokemon-name');
    const $id = document.getElementById('pokemon-id');
    const $img = document.getElementById('pokemon-image');
    const $tags = document.getElementById('tags');

    $name.textContent = capitalizeFirstLetter(name);
    $id.textContent = "#" + parseToThreeDigits(id);
    $img.src = sprites.other.dream_world.front_default;
    appendTags($tags, createTags(getTagsNames(types)));

}



function createTags(names) {
    const $tagTemplate = document.getElementById('tag-template').content;

    return Array.from(names, (name) => {
        const $newTag = $tagTemplate.querySelector('li').cloneNode(true);
        $newTag.textContent = capitalizeFirstLetter(name);

        return $newTag
    })
}

function getTagsNames(data) {
    const tags = Array.from(data, tag => tag.type.name );

    return tags;
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


// ############## UTILS ##############

function eggGroupsToString(obj) {
    return obj.map(innerObj => parseFromHyphen(innerObj.name)).join(', ');
}


function abilitiesToString(obj) {
    return obj.map(innerObj => parseFromHyphen(innerObj.ability.name)).join(', ');
}


function convertMetersToFeetAndInches(meters) {
    const totalInches = meters * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
}


function convertKgToLb(kg) {
    const lb = kg * 2.20462;
    return lb;
  }


function capitalizeFirstLetter(string) {
    return string[0].toUpperCase().concat(string.slice(1));
}


function getID(url) {
    const numbersRegex = /\d/g;
    return url.match(numbersRegex).slice(1).join("");
}


function parseToThreeDigits(number) {
    if (number < 10) {
        return '00' + number.toString();
    }else if (number < 100) {
        return '0' + number.toString();
    }else
        return number.toString();
}

function getGenderProbability(genderRate) {
    if (genderRate === -1) {
      return [0, 0];
    } else if (genderRate === 0) {
      return [0, 0];
    } else if (genderRate === 1) {
      return [100, 0];
    } else if (genderRate === 2) {
      return [50, 50];
    } else if (genderRate >= 3 && genderRate <= 7) {
      const femaleChance = 100 / (genderRate * 2);
      return [100 - femaleChance, femaleChance];
    } else if (genderRate === 8) {
      return [0, 100];
    }
  }


function parseFromHyphen(string) {
    return capitalizeFirstLetter(string.replaceAll('-', ' '));
}


function parseFromSnake(string) {
    return capitalizeFirstLetter(string.replaceAll('_', ' '));
}


function checkError(value) {
    if (Number.isInteger(value) && (value > 0 && value <= 65)) {
        return true;
    }

    return false;
}

// ############## DOM ##############

function appendSection($element) {
    const $main = document.getElementById('app');
    $main.appendChild($element);
    
}

function appendItem(parent, item) {
    parent.appendChild(item);
}


function appendTags($element, $tagsElements) {
    $tagsElements.forEach($tag => $element.appendChild($tag));
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


function showPokemonUI() {
    document.getElementById('pokemon-info').classList.remove("hidden");
    document.getElementById('close').addEventListener('click', showList);
}


function hidePokemonUI() {
    document.getElementById('pokemon-info').remove();

}

function hideList() {
    document.getElementById('pokemons-list').classList.add('hidden');
    document.getElementById('pagination').classList.add('hidden');
}


function showList() {
    document.getElementById('pokemons-list').classList.remove('hidden');
    document.getElementById('pagination').classList.remove('hidden');
    hidePokemonUI();
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
document.getElementById('pokemons-list').addEventListener('click', (e) => initializePokemon(e));
