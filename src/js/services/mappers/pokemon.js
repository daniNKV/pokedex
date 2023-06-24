import PokeList from '../entities/PokemonList.js';
import Pokemon from '../entities/Pokemon.js';
import Stat from '../entities/Stat.js';

export function mapPokemon(mainEndpoint = {}, specieEndpoint = {}, sprites) {
    const capitalize = (string) => string[0].toUpperCase().concat(string.slice(1));
    const parseFromHyphen = (string) => string.replaceAll('-', ' ');

    const {
        id,
        base_experience: xp,
        name,
        height,
        weight,
        types,
        stats,
        abilities,
    } = mainEndpoint;

    const {
        egg_groups: eggGroups,
        gender_rate: genderRate,
        generation,
        growth_rate: growthRate,
        habitat,
        shape,
        color,
    } = specieEndpoint;

    return new Pokemon(
        id,
        xp,
        capitalize(name),
        height,
        weight,
        types.map((item) => capitalize(item.type.name)),
        stats.map((item) => new Stat(capitalize(parseFromHyphen(item.stat.name)), item.base_stat)),
        abilities.map((item) => capitalize(parseFromHyphen(item.ability.name))),
        eggGroups ? eggGroups.map((group) => capitalize(group.name)) : ['Not', 'Discovered'],
        genderRate ? Number(genderRate) : -2,
        capitalize(generation ? generation.name : 'unknown'),
        capitalize(growthRate ? growthRate.name : 'unknown'),
        capitalize(parseFromHyphen(habitat ? habitat.name : 'unknown')),
        capitalize(shape ? shape.name : 'unknown'),
        capitalize(color ? color.name : 'unknown'),
        sprites,
    );
}

export function mapPokemonList(api, getSprite) {
    const { count, results } = api;
    const getIdFromUrl = (url) => url.match(/\d/g).slice(1).join('');
    const capitalize = (string) => string[0].toUpperCase().concat(string.slice(1));

    return new PokeList(
        count,
        results.map((pokemon) => {
            const { name, url } = pokemon;
            return {
                id: getIdFromUrl(url),
                name: capitalize(name),
            };
        }),
        getSprite,
    );
}
