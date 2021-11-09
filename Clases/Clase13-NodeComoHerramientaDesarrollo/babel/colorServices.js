function getRandomColor(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const getColor = () => {
    let r = getRandomColor(0, 250);
    let g = getRandomColor(0, 250);
    let b = getRandomColor(0, 250);
    return `RGB(${r},${g},${b})`;
}

export {
    getColor
}