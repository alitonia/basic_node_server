const parseCookie = str => {
    if (str === '') {
        return {}
    }
    return str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
}

const structuredCookie = parseCookie(document.cookie)
const token = structuredCookie['token']

function deleteCookie(path) {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${path || ''}`;
}

const handleRemove = (product_id, receipt_id, color, size) => {
    // console.log(product_id, receipt_id, color, size)

    return fetch('/order', {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            product_id: product_id,
            receipt_id: receipt_id,
            color: color,
            size: size
        })
    }).then(res => {
        if (res.status === 401) {
            deleteCookie()
            alert('Your session has ended. Please login to continue.')
            document.location.href = '/login.html'
        } else {
            // console.log(res)
            return res.json()
        }
    }).then(x => {
        if (x && x.error) {
            throw new Error(x.error)
        }
        window.location.replace(window.location.href)
        return x
    }).catch(err => {
        console.warn(err)
        alert(err.message)
        return null
    })
}

async function getCurrentCart() {
    return fetch('/get_cart_id', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(x => {
        if (x.status === 401) {
            //unauthorized. Maybe out of session
            deleteCookie()
            alert('Your session has ended. Please login to continue.')
            document.location.href = '/login.html'

        } else {
            return x.json()
        }
    }).then(x => {
        if (x && x.error) {
            document.querySelector('.message_status').style.display = 'none'
            throw new Error(x.error)
        }
        return x
    }).catch(err => {
        console.warn(err)
        alert(err.message)
        return null
    })
}

let canMoveOnFlag = true

async function start() {
    if (!token) {
        alert('Your session has ended. Please login to continue.')
        document.location.href = '/login.html'
    }

    const cart = await getCurrentCart()
    if (!cart) {
        return
    }
    // console.log(cart)

    const b = document.querySelector('#board')

    if (cart.length === 0) {
        b.style.border = 'none'
        b.style['background-color'] = '#ffffff'
        document.querySelector('.home_button').style['margin-left'] = '27%'
        document.querySelector(`.transaction_button`).remove()
    } else {

        let total_object = {}

        b.innerHTML = (`
            ${cart.reduce((acc, cur) => {

            const id = cur.product_id
            const current_stock = cur.current_stock
            const quantity = cur.quantity

            if (!total_object[id]) {
                total_object[id] = {
                    current: quantity,
                    max: current_stock
                }
            } else {
                total_object[id].current += quantity
            }
            const isTotalSafe = total_object[id].current <= total_object[id].max
            //add to total object

            const isNotAvailable = !cur.available || cur.quantity > cur.current_stock || !isTotalSafe
            if (isNotAvailable) {
                canMoveOnFlag = false
            }

            return acc + `
                <div class="a_product ${isNotAvailable ? 'expired' : ''}">
                    <div class='product_infor'>
                        <img class='product_img' src='${cur.big_image_link}'>

                        <div class='product_detail main-dish'>
                            <h2 class='product_title biffer-text'>${cur.product_name}</h2>
                            <p class='color_display' >Color: <span class='color_product'>${cur.color}</span></p>
                            <p class='size_display' >Size: <span class='size_product'>${cur.size}</span></p>
                        </div>
                    </div>
                    <div class="alternative">
                        <div class='product_detail'>
                                <h2 class='product_title biffer-text'>${cur.product_name}</h2>
                                <p class='color_display' >Color: <span class='color_product'>${cur.color}</span></p>
                                <p class='size_display' >Size: <span class='size_product'>${cur.size}</span></p>
                        </div>
                        <div class='product_price'>
                            <h2 class="price_tag">Price($)</h2>
                            <p class='price'>$${cur.price.toFixed(2)}</p>
                        </div>
                        <div class='product_quantity'>
                            <h2 class="quantity_tag">Quantity</h2>
                            <p class='quantity'>${!isNotAvailable ? cur.quantity : '<span class="warning-sight">This product is out of stock. Please remove it before you continue.</span>'}</p>
                        </div>
                        <div class='btn_delete'>
                            <button class='remove little-pad' onclick="handleRemove(${cur.product_id}, ${cur.receipt_id}, '${cur.color}', '${cur.size}')">Remove</button>
                        </div>
                    </div>

                    <div class='product_price main-dish'>
                        <h2 class="price_tag">Price($)</h2>
                        <p class='price'>$${cur.price.toFixed(2)}</p>
                    </div>
                    <div class='product_quantity main-dish'>
                        <h2 class="quantity_tag">Quantity</h2>
                        <p class='quantity'>${!isNotAvailable ? cur.quantity : '<span class="warning-sight">This product is out of stock. Please remove it before you continue.</span>'}</p>
                    </div>
                    <div class='btn_delete main-dish'>
                        <button class='remove little-pad' onclick="handleRemove(${cur.product_id}, ${cur.receipt_id}, '${cur.color}', '${cur.size}')">Remove</button>
                    </div>
                </div>
                `
        }, '')}

            `)
        if (!canMoveOnFlag) {
            document.querySelector('.transaction_button').classList.add('no-go-button')
        }
    }
}

start()

function handleMoving() {
    if (canMoveOnFlag) {
        window.location.href = './transaction.html'
    } else {
        alert('Your cart contains out of stock products. Please remove them before continue.')
    }
}


document.querySelectorAll('.moving-soap').forEach(p => {
    p.onclick = handleMoving
})