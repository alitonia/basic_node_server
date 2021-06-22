const pool = require('../connect_database.js');
const path = require('path');
const fs = require('fs')
const {v4: uuid} = require('uuid');
const util = require('util');


const addNewProduct = (fields) => {
    return (
        `
        INSERT INTO products(
        name, description,
        price, bought,
        current_stock,
        big_image_link,
        category_id, available, address,
        color_options, size_options
        )
        VALUES(
        '${fields['name']}', 
        '${fields['description']}',
        '${fields['price']}',
        '${fields['bought']}',
        '${fields['current_stock']}',
        '${fields['big_image_link']}',
        '${fields['category_id']}', 
        '${fields['available']}', 
        '${fields['address']}',
        '${fields['color_options']}', 
        '${fields['size_options']}'
        )
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


module.exports.addAProduct = async (req, res) => {

    try{
        const body = req.body
        const {color_options, size_options, ...rest} = body || {}

        const parsedColor = tryParse(color_options, [])
        const parsedSize = tryParse(size_options, [])

        const isValidColors = parsedColor.reduce((acc, cur)=>{
            return acc && isColor(cur)
        }, true)


        if (parsedColor.length === 0 || parsedSize.length === 0 || !isValidColors) {
            res.status(501)
            return res.send({error: 'Invalid request'})
        }

        if (!body['big_image_link'] || !body['big_image_link_type']) {
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
            return res.send({error: 'Invalid request 1'})
        }


        // upload image
        try{
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
        catch(e){
            console.warn(e)
            res.status(501)
            return res.send({error: "Internal error"})
        }

        // console.log(reqOb)

        const modifyingQuery = addNewProduct(reqOb)

        // console.log(modifyingQuery)


        try{
            const result = await pool.query(modifyingQuery)
            // console.log(result)
        }catch(e){
            console.log(e)

            // remove saved image
            await dfile(path.join(__dirname, '../../client/public', reqOb['big_image_link']))

            res.status(501)
            return res.send({error: "Internal error"})
        }

        return res.send({status: 'OK'})
    }
    catch(e){
        console.log(e)
        res.status(501)
        return res.send({error: "Internal error"})
    }

};