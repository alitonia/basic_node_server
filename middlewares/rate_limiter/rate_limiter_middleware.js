const {_client: redisClient} = require('../redis_cache/redis-client');
const {RateLimiterRedis} = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 30, // care this number. Might mess up pages with lot of images
    duration: 1, // per 1 second by IP
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log(err)
            res.status(429).send('Too Many Requests');
        });
};

module.exports = rateLimiterMiddleware;