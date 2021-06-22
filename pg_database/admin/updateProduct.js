const pool = require('../connect_database.js');
const path = require('path');
const fs = require('fs')
const {v4: uuid} = require('uuid');
const util = require('util');


const updateProductQuery = (id, fields) => {
    const length = Object.keys(fields).length

    const sets = Object.entries(fields).reduce((acc, [key, val], index) => {
        return `${acc} ${key} = '${val}' ${(index === length - 1) ? '' : ','}`
    }, 'set ')

    return (
        `UPDATE products
        ${sets}
        where id = ${id}
        ;`
    )
}

const getProductWithId = (id) => {
    return (
        `SELECT *
         FROM products
         where id = '${id}'
        ;`
    )
}

// note: careful when refactoring
const saveImageRoute = path.join(__dirname, '../../client/public', 'images')

fs.mkdirSync(saveImageRoute, {recursive: true, mode: 0o755});

const makeRandomName = (ext) => {
    return `${uuid()}.${ext}`
}

const MAX_CREATE_NAME_ATTEMPT = 15

const makeNewFileName = (ext) => {
    for (let i = 0; i < MAX_CREATE_NAME_ATTEMPT; i++) {
        const aName = makeRandomName(ext)
        if (!fs.existsSync(path.join(saveImageRoute, aName))) {
            return aName
        }
    }
    return null
}

const getExt = (str) => {
    switch (str) {
        case 'image/png':
            return 'png'
        case 'image/jpeg':
            return 'jpeg'
        case 'image/jpg':
            return 'jpg'
        default:
            return null
    }
}

const allowedFields = [
    'name', 'description',
    'price', 'bought',
    'current_stock',
    'big_image_link',
    'category_id', 'available', 'address',
    'color_options', 'size_options'
]

const wfile = util.promisify(fs.writeFile)
const dfile = util.promisify(fs.unlink)


const isUploadedPath = (p) => /^images\/.*$/.test(p)


const tryParse = (x, fallback = null) => {
    try {
        return JSON.parse(x)
    } catch (e) {
        console.log(e)
        return fallback
    }
}

function isColor(value = '') {
    return /^#[abcedfABCDEF0-9]{3,8}$/.test(value)
}

module.exports.updateProduct = async (req, res) => {

    try {
        const body = req.body
        const {id, color_options, size_options, ...rest} = body || {}

        const parsedColor = color_options ? tryParse(color_options, []) : []
        const parsedSize = size_options ? tryParse(size_options, []) : []

        const isValidColors = parsedColor.reduce((acc, cur) => {
            return acc && isColor(cur)
        }, true)


        if (!id
            || (color_options !== undefined && (parsedColor.length === 0 || !isValidColors))
            || (size_options !== undefined && parsedSize.length === 0)
        ) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }


        const _matchingIdProduct = await pool.query(getProductWithId(id))

        if (!_matchingIdProduct || _matchingIdProduct.rows.length === 0) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }

        const targetedProduct = _matchingIdProduct.rows[0]
        const currentImagePath = targetedProduct.big_image_link


        const reqOb = {}

        //sanitize
        const emptyValues = [null, undefined, ''];

        Object.entries(body || {}).forEach(([key, val]) => {
            if (allowedFields.includes(key) && !emptyValues.includes(val)) {
                reqOb[key] = val
            }
        })

        //no modification
        if (Object.keys(reqOb).length === 0) {
            return res.send({status: 'OK', id: id})
        }

        if (body['big_image_link'] && !body['big_image_link_type']) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }

        const isModifyingImage = !!body['big_image_link']

        // upload image

        try {
            if (isModifyingImage) {
                const ext = getExt(body['big_image_link_type'])

                if (!ext) {
                    res.status(501)
                    return res.send({error: "Invalid file type"})
                }

                const pendingName = makeNewFileName(ext)

                if (!pendingName) {
                    res.status(501)
                    return res.send({error: "Can't upload your file"})
                }
                // console.log(pendingName)

                const base64Data = body['big_image_link'].replace(/^data:image\/(png|jpe?g);base64,/, "");
                await wfile(path.join(saveImageRoute, pendingName), base64Data, 'base64');

                reqOb['big_image_link'] = path.join('images', pendingName)
            }
        } catch (e) {
            console.warn(e)
            res.status(501)
            return res.send({error: "Internal error"})
        }

        const modifyingQuery = updateProductQuery(id, reqOb)

        // console.log(modifyingQuery)

        try {
            await pool.query(modifyingQuery)
        } catch (e) {
            console.log(e)

            // remove saved image
            await dfile(path.join(__dirname, '../../client/public', reqOb['big_image_link']))

            res.status(501)
            return res.send({error: "Internal error"})
        }


        // remove old image
        const oldImagePath = path.join(__dirname, '../../client/public', currentImagePath)

        if (
            isModifyingImage
            && currentImagePath
            && isUploadedPath(currentImagePath)
            && fs.existsSync(oldImagePath)
        ) {
            // console.log('uploaded image: ', oldImagePath)
            await dfile(oldImagePath)
        }

        return res.send({status: 'OK', id: id})
        // TODO: handle error, delete image if error
    } catch (e) {
        console.log(e)
        res.status(501)
        return res.send({error: "Internal error"})
    }

};