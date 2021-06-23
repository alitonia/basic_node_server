const isLOGIN = (path) => {
    return /^(\/admin)?\/login(\?.*)?$/.test(path)
}

exports.isLOGIN = isLOGIN