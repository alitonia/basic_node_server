const pool = require('../connect_database.js');
const path = require('path');
const fs = require('fs')
const {v4: uuid} = require('uuid');
const util = require('util');


const updateCategoryQuery = (id, fields) => {
    const length = Object.keys(fields).length

    const sets = Object.entries(fields).reduce((acc, [key, val], index) => {
        return `${acc} ${key} = '${val}' ${(index === length - 1) ? '' : ','}`
    }, 'set ')

    return (
        `UPDATE categories
        ${sets}
        where id = ${id}
        ;`
    )
}

const getCategoryWithId = (id) => {
    return (
        `SELECT *
         FROM categories
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
    'image_link',
    'parent_category',
]

const wfile = util.promisify(fs.writeFile)
const dfile = util.promisify(fs.unlink)


const isUploadedPath = (p) => /^images\/.*$/.test(p)


module.exports.updateCategory = async (req, res) => {
    try {
        const body = req.body || {}
        const {id, ...rest} = body

        if (!id) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }


        const _matchingIdCategory = await pool.query(getCategoryWithId(id))

        if (!_matchingIdCategory || _matchingIdCategory.rows.length === 0) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }

        const targetedCategory = _matchingIdCategory.rows[0]
        const currentImagePath = targetedCategory.image_link

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

        if (body['image_link'] && !body['image_link_type']) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }

        const isModifyingImage = !!body['image_link']

        // upload image

        try {
            if (isModifyingImage) {
                const ext = getExt(body['image_link_type'])

                if (!ext) {
                    res.status(501)
                    return res.send({error: "Invalid file type"})
                }

                const pendingName = makeNewFileName(ext)

                if (!pendingName) {
                    res.status(501)
                    return res.send({error: "Can't upload your file"})
                }
                console.log(pendingName)

                const base64Data = body['image_link'].replace(/^data:image\/(png|jpe?g);base64,/, "");
                await wfile(path.join(saveImageRoute, pendingName), base64Data, 'base64');

                reqOb['image_link'] = path.join('images', pendingName)
            }
        } catch (e) {
            console.warn(e)
            res.status(501)
            return res.send({error: "Internal error"})
        }

        const modifyingQuery = updateCategoryQuery(id, reqOb)

        console.log(modifyingQuery)

        try {
            await pool.query(modifyingQuery)
        } catch (e) {
            console.log(e)

            // remove saved image
            await dfile(path.join(__dirname, '../../client/public', reqOb['image_link']))

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
            console.log('uploaded image: ', oldImagePath)
            await dfile(oldImagePath)
        }

        return res.send({status: 'OK', id: id})
    } catch (e) {
        console.log(e)
        res.status(501)
        return res.send({error: "Internal error"})
    }

};