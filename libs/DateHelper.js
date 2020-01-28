const currentTime = () => {
    return Date.now();
}

const timeSubstraction = (first, second) => {
    return second - first;
}

export {
    currentTime,
    timeSubstraction
}