const express = require('express');
const route = express.Router();
const redis = require('./redis-client')

redis.flushAllAsync()
// redis.setAsync('/assets/css/base.css', 'Hello')

const updatedTimeline = {
    '/products': 100
}

const _noCache = ['/meme']

const noCache = _noCache.reduce((acc, cur) => {
    acc[cur] = 1
    return acc
}, {})


const groups = [
    ['/admin/products', '/products', '/product', '/buy', '/get_cart_id',],
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

const isValid = (path, time) => {
    return path && (!updatedTimeline[path] || updatedTimeline [path] <= time)
}

const setPathUpdated = (path) => {
    const k = extractPathName(path)
    if (k) {
        console.log('******', k)
        updatedTimeline[k] = Date.now()
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
    console.log(related)
    related.forEach(p => setPathUpdated(p))
}

const regCSS = /^.*\.css/

route.get('/*', ((req, res, next) => {
    const key = req.url
    const oldSend = res.send
    const oldSendFile = res.sendFile
    const params = req.params

    console.log(key)

    const k = extractPathName(key)

    if (noCache[k]) {
        return next()
    }

    // console.log(req.method)
    // console.log(req.url)

    redis.getAsync(key)
        .then((data) => {
            let sendData = null
            if (data !== null && data !== undefined) {
                const {data: returnData, savedTime} = JSON.parse(data)
                if (isValid(k, savedTime)) {
                    sendData = returnData
                } else {
                    redis.deleteAsync(key)
                }
            }

            if (sendData !== null && sendData !== undefined) {
                console.log('cached', key)
                return res.status(200).send(sendData);
            } else {
                res.send = function (chunk) {
                    if (chunk !== undefined) {
                        redis.setAsync(
                            key,
                            JSON.stringify({
                                data: chunk,
                                savedTime: Date.now()
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
    console.log('post', key)
    invalidatePaths(key)
    return next()
}))


route.put('/*', ((req, res, next) => {
    const key = req.url
    console.log('put', key)
    invalidatePaths(key)
    return next()
}))


route.delete('/*', ((req, res, next) => {
    const key = req.url
    invalidatePaths(key)
    return next()
}))


module.exports = route;
