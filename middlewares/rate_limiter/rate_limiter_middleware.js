const {_client: redisClient} = require('../redis_cache/redis-client');
const {RateLimiterRedis} = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 60, // care this number. Might mess up pages with lot of images
    duration: 1, // per 1 second by IP
});


const isIMG = (url) => {
    return /(png|jpe?g)$/.test(url)
}

const rateLimiterMiddleware = (req, res, next) => {
    const isImage = isIMG(req.url)

    rateLimiter.consume(req.ip, isImage ? 2 : 1)
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log(err)
            res.status(429).send({error: 'Too Many Requests'});
        });
};

module.exports = rateLimiterMiddleware;