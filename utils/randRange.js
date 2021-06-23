exports.randRange = (range, lowerBound = 0) => {
    return lowerBound + Math.round(Math.random() * range);
}