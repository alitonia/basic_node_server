const pool = require('../connect_database.js');
const path = require('path');
const fs = require('fs')
const {v4: uuid} = require('uuid');
const util = require('util');


const addNewCategory = (fields) => {
    return (
        `
            INSERT INTO categories(name, description,
                                   image_link,
                                   parent_category)
            VALUES ('${fields['name']}',
                    '${fields['description']}',
                    '${fields['image_link']}',
                    '${fields['parent_category']}')
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


module.exports.addACategory = async (req, res) => {

    try {
        const body = req.body

        if (!body['image_link'] || !body['image_link_type']) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }


        const reqOb = {}

        //sanitize
        const emptyValues = [null, undefined, ''];

        Object.entries(body || {}).forEach(([key, val]) => {
            if (allowedFields.includes(key) && !emptyValues.includes(val)) {
                reqOb[key] = val
            }
        })

        if (Object.keys(reqOb).length !== allowedFields.length) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }


        // upload image
        try {
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
            // console.log(pendingName)

            const base64Data = body['image_link'].replace(/^data:image\/(png|jpe?g);base64,/, "");
            await wfile(path.join(saveImageRoute, pendingName), base64Data, 'base64');

            reqOb['image_link'] = path.join('images', pendingName)
        } catch (e) {
            console.warn(e)
            res.status(501)
            return res.send({error: "Internal error"})
        }

        // console.log(reqOb)

        const modifyingQuery = addNewCategory(reqOb)

        // console.log(modifyingQuery)


        try {
            const result = await pool.query(modifyingQuery)
            // console.log(result)
        } catch (e) {
            console.log(e)

            // remove saved image
            await dfile(path.join(__dirname, '../../client/public', reqOb['image_link']))

            res.status(501)
            return res.send({error: "Internal error"})
        }

        return res.send({status: 'OK'})
    } catch (e) {
        console.log(e)
        res.status(501)
        return res.send({error: "Internal error"})
    }
};