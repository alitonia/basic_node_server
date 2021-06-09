const express = require('express');
const route = express.Router();
const redis = require('./redis-client')

const invalidatedParams = []

route.get('/*', ((req, res, next) => {
    const key = req.url
    const oldSend = res.send
    const oldSendFile = res.sendFile
    const params = req.params

    console.log(req.url)
    if (!(
        params[0].includes('product')
        || params[0].includes('category')
        || params[0].includes('categories')
        || params[0].includes('meme')
    )) {
        return next()
    }

    redis.getAsync(key)
        .then((data) => {
            let sendData = null
            if (data !== null && data !== undefined) {
                sendData = JSON.parse(data)
            }

            if (sendData !== null && sendData !== undefined) {
                console.log('cached')
                res.status(200).send(sendData);
            } else {
                res.send = function (chunk) {
                    if (chunk !== undefined) {
                        redis.setAsync(key, JSON.stringify(chunk))
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
//
// route.post('/*', ((req, res, next) => {
//     const big_key = req.params
//     const key = req.url
//     redis.setAsync(big_key, JSON.stringify(null))
//         .catch((err) => {
//             console.log(err)
//         })
//     return next()
// }))
//
// route.put('/*', ((req, res, next) => {
//     const key = req.params
//     redis.setAsync(key, JSON.stringify(null))
//         .catch((err) => {
//             console.log(err)
//         })
//     return next()
// }))
//
// route.delete('/*', ((req, res, next) => {
//     const key = req.params
//     redis.setAsync(key, JSON.stringify(null))
//         .catch((err) => {
//             console.log(err)
//         })
//     return next()
// }))

module.exports = route;
