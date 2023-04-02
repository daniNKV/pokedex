import { 
    capitalizeFirstLetter, 
    parseToThreeDigits, 
    convertMetersToFeetAndInches, 
    convertKgToLb, 
    getPropertyValue,
    parseFromSnakeConvention 
} from '../utils.js';
import { showPokemonInformation, appendToMain, appendTags } from './dom.js';

export function handleNavigation(e) {
    if (e.target.classList.contains('unselected')) {
        const $nav = document.getElementById('nav-info');
        const $selected = $nav.children[$nav.dataset.selected];
        
        document.querySelector(`[data-section="${$nav.dataset.selected}"]`).classList.add('hidden')
        document.querySelector(`[data-section="${e.target.dataset.button}"]`).classList.remove('hidden')

        $selected.classList.remove('selected');
        $selected.classList.add('unselected');

        e.target.classList.remove('unselected');
        e.target.classList.add('selected')
    
        $nav.dataset.selected = e.target.dataset.button;
    }
}

export function showPokemon(basic, breeding) {
    appendToMain(createSection());
    makeHero(basic);
    makeAbout(basic);
    makeBreeding(breeding);
    makeStats(basic.stats);
    showPokemonInformation();
}

function makeBreeding(specieInformation) {
    const { egg_groups, gender_rate, growth_rate, habitat } = specieInformation;
    const items = { 
        Habitat: habitat.name, 
        ["Egg Groups"]: getPropertyValue(egg_groups, "name"),
        ["Growth Rate"]: growth_rate.name
    }
    
    const $breeding = document.getElementById('breeding-info');
    $breeding.appendChild(createGenderElement(getGenderProbability(gender_rate)));

    Object.entries(items).forEach(item => $breeding.appendChild(createItem(item[0], capitalizeFirstLetter(item[1]))));
}

function createGenderElement(genderProbabilities) {
    const $genders = document.getElementById('gender-template').content.cloneNode(true);

    $genders.getElementById('mars').textContent = genderProbabilities[0] + "% ";
    $genders.getElementById('venus').textContent = genderProbabilities[1] + "% ";

    return $genders;
}

function makeAbout(pokemonAttributes) {
    const { height, weight, abilities, base_experience } = pokemonAttributes;
    const items = { 
        Experience: base_experience, 
        Height: height*10 + " cm (" + convertMetersToFeetAndInches(height/10) + ")", 
        Weight: weight/10 + " kg (" + convertKgToLb(weight/10).toFixed(2) + " lb)", 
        Abilities: getPropertyValue(abilities, "ability") };

    const $about = document.getElementById('basic-info');

    Object.entries(items).forEach(item => $about.appendChild(createItem(item[0], item[1])));
}

function createSection() {
    return document.getElementById('pokemon-info-template').content.cloneNode(true);

}

function createItem(name, value) {
    const $itemTemplate = document.getElementById('about-item-template').content.cloneNode(true);

    $itemTemplate.querySelector('h3').textContent = capitalizeFirstLetter(name);
    $itemTemplate.querySelector('p').textContent = value;

    return $itemTemplate;
}

function makeHero(pokemonProfile) {
    const {name, id, sprites, types} = pokemonProfile;
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

function getTagsNames(pokemonTypes) {
    return Array.from(pokemonTypes, tag => tag.type.name );
}

function makeStats(pokemonStats) {
    const $statsElement= document.getElementById('stats');
    const $statItem = document.getElementById('stats-item-template');
    const $statTotalItem = document.getElementById('stats-total-template');
    const totalStats = pokemonStats.map(item => item.base_stat).reduce((a, b) => a + b);
    
    pokemonStats.forEach(pokemonStat => $statsElement.appendChild(createStat($statItem, pokemonStat.stat.name, pokemonStat.base_stat)));
    $statsElement.appendChild(createStat($statTotalItem, "Total", totalStats));
}

function createStat(template, name, value) {
    const $stat = template.content.cloneNode(true);

    $stat.querySelector('h3').textContent = capitalizeFirstLetter(parseFromSnakeConvention(name));
    $stat.querySelector('p').textContent = value;
    $stat.querySelector('progress').value = value;

    return $stat;

}

function getGenderProbability(genderRate) {
    if (genderRate !== -1) {
        const femaleChance = (genderRate / 8) * 100;
        const maleChance = (femaleChance === 100) ? 0 : 100 - femaleChance;

        return [maleChance, femaleChance];
    } else {
        return [0, 0];
    }
  }


