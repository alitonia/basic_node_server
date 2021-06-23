const {isAdmin} = require("../../utils/isAdmin");
const {_client: redisClient} = require('../redis_cache/redis-client');
const {RateLimiterRedis} = require('rate-limiter-flexible');
const {isLOGIN} = require("../../utils/isLOgin");

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 120, // care this number. Might mess up pages with lot of images
    duration: 1, // per 1 second by IP
});

const isMeme = (path) => {
    return path === '/meme'
}

const isIMG = (url) => {
    return /(png|jpe?g)$/.test(url)
}

const liveSave = {}

const cooldownTime = 1000 * 5
const limitTry = 4

const incrementLiveSave = (ip) => {
    const record = liveSave[ip]
    if (!record) {
        liveSave[ip] = {
            count: 1,
            last: Date.now()
        }
        return 1
    } else {
        const {last, count} = record
        if (last + cooldownTime < Date.now()) {
            record.count += 1
            record.last = Date.now()
            return record.count
        } else {
            liveSave[ip] = {
                count: 1,
                last: Date.now()
            }
            return 1
        }
    }
}

const isOK = (path, ip) => {
    const count = incrementLiveSave(ip)
    return count < limitTry
}


const rateLimiterMiddleware = (req, res, next) => {
    const isImage = isIMG(req.path)
    const isLogin = isLOGIN(req.path, req.ip)

    let pointToConsume = 3

    if (isImage) {
        pointToConsume = 1
    } else if (isLogin && !isOK(req.path, req.ip) || isMeme(req.path)) {
        pointToConsume = 60
    } else if (isAdmin(req.path)) {
        pointToConsume = 1
    }

    rateLimiter.consume(req.ip, pointToConsume)
        .then(() => {
            // console.log('k', req.url, pointToConsume)
            next();
        })
        .catch((err) => {
            console.log(err)
            res.status(429).send({error: 'Too Many Requests'});
        });
};

module.exports = rateLimiterMiddleware;