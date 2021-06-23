const adminPathReg = /^\/admin\/.*[a-zA-Z0-9](\?.*)?$/

const isAdmin = (path) => {
    return adminPathReg.test(path)
}
exports.isAdmin = isAdmin