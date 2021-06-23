const {isAdmin} = require("../../utils/isAdmin");
const testPathReg = /.*\.(html|css|js|png|jpe?g|ico)/
const notCachePath = ['/get_cart_id']

const cacheControl = (req, res, next) => {
    if (
        req.method === 'GET'
        && !testPathReg.test(req.path)
        && !notCachePath.includes(req.path)
        && !isAdmin(req.path)
    ) {
        res.setHeader('Cache-Control', `public max-age:${60 * 5}, stale-while-revalidate=${60}`)
    }
    next()
}

module.exports = cacheControl