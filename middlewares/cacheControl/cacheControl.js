const testPathReg = /.*\.(html|css|js|png|jpe?g|ico)/
const notCachePath = []

const cacheControl = (req, res, next) => {
    if (req.method === 'GET' && !testPathReg.test(req.url)) {
        res.setHeader('Cache-Control', 'max-age:90')
    }
    next()
}

module.exports = cacheControl