export default class Pokemon {
    constructor(
        id,
        xp,
        name,
        height,
        weight,
        types = [],
        stats = [],
        abilities = [],
        eggGroups = [],
        genderRate,
        generation,
        growthRate,
        habitat,
        shape,
        color,
        sprites,
    ) {
        this.id = id;
        this.xp = xp;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.types = types;
        this.stats = stats;
        this.abilities = abilities;
        this.eggGroups = eggGroups;
        this.genderRate = genderRate;
        this.generation = generation;
        this.growthRate = growthRate;
        this.habitat = habitat;
        this.shape = shape;
        this.color = color;
        this.sprites = sprites;
    }
}
