export function capitalizeFirstLetter(string) {
    return string[0].toUpperCase().concat(string.slice(1));
}
export function convertMetersToFeetAndInches(meters) {
    const totalInches = meters * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);

    return `${feet}'${inches}"`;
}

export function convertKgToLb(kg) {
    return kg * 2.20462;
}

export function parseToThreeDigits(number) {
    if (number < 10) {
        return `00${number.toString()}`;
    } if (number < 100) {
        return `0${number.toString()}`;
    }
    return number.toString();
}

export function parseFromSnakeConvention(string) {
    return capitalizeFirstLetter(string.replaceAll('_', ' '));
}
