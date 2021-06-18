const pool = require('../connect_database.js');
const path = require('path');
const fs = require('fs')
const {v4: uuid} = require('uuid');


const updateProductQuery = (id, field, value) => {
    return (
        `UPDATE products
         set ${field} = ${value}
         where id = '${id}'
        ;`
    )
}

const valueTree = {
    available: {
        values: [true, false],
        any: false
    }
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

module.exports.updateProduct = (req, res) => {
    const body = req.body
    // console.log(body)
    // not actually link. Currently base64
    if (body['big_image_link'] && body['big_image_link_type']) {
        const ext = getExt(body['big_image_link_type'])
        console.log(body['big_image_link'].slice(0, 100))

        if (!ext) {
            res.status(501)
            return res.send({error: "Can't upload your file"})
        }

        const pendingName = makeNewFileName(ext)
        if (!pendingName) {
            res.status(501)
            return res.send({error: "Can't upload your file"})
        }
        console.log(pendingName)
        const base64Data = body['big_image_link'].replace(/^data:image\/(png|jpe?g);base64,/, "");
        fs.writeFile(path.join(saveImageRoute, pendingName), base64Data, 'base64', function (err) {
            console.log(err);
        });
        return res.send({status: pendingName})
    }
    return res.send({status: 'OK'})

    const {id, field, value} = body || {}

    const allowedFields = Object.keys(valueTree)
    if (!id || !allowedFields.includes(field) || (!valueTree[field].values.includes(value) && !valueTree[field].any)) {
        return res.send({error: 'Something went wrong'})
    }

    pool.query(updateProductQuery(id, field, value),
        (err, response) => {
            if (err || !response) {
                res.status(501)
                return res.send({error: 'Something went wrong'})
            }
            return res.send({status: 'OK'})
        }
    );
};