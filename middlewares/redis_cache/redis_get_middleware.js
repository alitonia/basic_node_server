const express = require('express');
const route = express.Router();
const redis = require('./redis-client')
const {randRange} = require("../../utils/randRange");

redis.flushAllAsync()

const updatedTimeline = {
    '/products': 100
}

const _noCache = [
    // '/meme'
    '/get_cart_id'
]


const noCache = _noCache.reduce((acc, cur) => {
    acc[cur] = 1
    return acc
}, {})


const groups = [
    ['/admin/products', '/product', '/buy', '/get_cart_id',],
    ['/admin/products', '/products', '/product', '/get_cart_id',],
    ['/admin/categories', '/categories', '/category/:id',],
    ['/admin/orders', '/orders', '/buy', '/get_cart_id', '/order', '/add_to_cart'],
    ['/admin/customers', '/get_cart_id', '/signup'],
    ['/reviews', '/review']
]

const lookupGroup = groups.reduce((acc, cur, index) => {
    cur.forEach(p => {
        if (!acc[p]) {
            acc[p] = [index]
        } else {
            acc[p].push(index)
        }
    })
    return acc
}, {})

const pathWithQuery = /^(\/[a-zA-Z0-9_\-\/]*)\??.*$/
const pathWithIndex = /^(\/[a-zA-Z0-9_\-\/]*)(\/[0-9]+)$/

const extractPathName = (path) => {
    const r = path.match(pathWithQuery)
    if (r && r.length >= 2) {
        const noQueryPath = r[1]
        const r1 = noQueryPath.match(pathWithIndex)

        if (r1 && r1.length >= 2) {
            return r1[1]
        } else {
            return noQueryPath
        }

    } else {
        return null
    }
}

const MAX_STALE = 1000 * 60 * 5

const isValid = (path, time) => {
    if (!path) {
        // console.log('+++++++++++++++++++++')
        return false
    }
    if (!updatedTimeline[path]) {
        return true
    }
    return (updatedTimeline[path] <= time)
        && updatedTimeline[path] <= Date.now() + MAX_STALE;

}

const setPathUpdated = (path, exactTime) => {
    const k = extractPathName(path)
    if (k) {
        const time = exactTime || Date.now()
        // console.log('******', k, time)
        updatedTimeline[k] = time
    }
}


const getRelated = (path) => {
    const rlOb = {};
    (lookupGroup[path] || []).map(i => groups[i]).flat(1).forEach(p => rlOb[p] = 1);
    return Object.keys(rlOb)
}

const invalidatePaths = (pathOrigin) => {
    const barePath = extractPathName(pathOrigin)
    setPathUpdated(barePath)

    const related = getRelated(barePath)
    // console.log(`////`, related)
    related.forEach(p => setPathUpdated(p))
}

const getDeviatedTime = () => {
    return Date.now() + randRange(1000 * 60 * 2)
}

route.get('/*', ((req, res, next) => {
    const key = req.url
    const oldSend = res.send

    const k = extractPathName(key)

    if (noCache[k]) {
        return next()
    }

    redis.getAsync(key)
        .then((data) => {
            let sendData = null
            if (data !== null && data !== undefined) {
                const {data: returnData, savedTime} = JSON.parse(data)

                if (isValid(k, savedTime)) {
                    sendData = returnData
                } else {
                    // console.log('bad key ' + key)
                    redis.deleteAsync(key)
                }
            }

            if (sendData !== null && sendData !== undefined) {
                // console.log('cached', key)
                return res.status(200).send(sendData);
            } else {
                res.send = function (chunk) {
                    // console.log(`setting ${key}`)
                    if (chunk !== undefined) {
                        const savingTime = getDeviatedTime()
                        redis.setAsync(
                            key,
                            JSON.stringify({
                                data: chunk,
                                savedTime: savingTime
                            })
                        )
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                    return oldSend.apply(res, arguments);
                }
                return next()

            }
        })
        .catch((err) => {
            res.status(500).send({message: err.message});
        })
}))


route.post('/*', ((req, res, next) => {
    const key = req.url
    // console.log('post', key)
    invalidatePaths(key)
    return next()
}))


route.put('/*', ((req, res, next) => {
    const key = req.url
    // console.log('put', key)
    invalidatePaths(key)
    return next()
}))


route.delete('/*', ((req, res, next) => {
    const key = req.url
    invalidatePaths(key)
    return next()
}))


module.exports = route;
