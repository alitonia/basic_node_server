const capitalize = (str) => str && str.length > 0 ? str[0].toUpperCase() + str.slice(1,) : ''

const token = structuredCookie['token']

function deleteCookie(path) {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${path || ''}`;
}

async function getOrders() {
    return fetch('/orders', {
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
        }
        return x.json()
    }).then(x => {
        if (x && x.error) {
            throw new Error(x.error)
        }
        return x
    }).catch(err => {
        console.warn(err)
        alert(err.message)
        return null
    })
}

function handleView(id) {
    window.location.href = `./order_detail.html?receipt_id=${id}`
}

async function start() {
    if (!structuredCookie['token']) {
        alert('Your session has ended. Please login to continue.')
        document.location.href = '/login.html'
        return;
    }

    const orders = await getOrders()
    if (!orders) {
        return
    }

    const injectSpace = document.querySelector('.injectable-space')
    const space = document.querySelector('.board-space')

    if (orders.length === 0) {
        space.innerHTML = (`
                <h4 style="font-size: 20px">Your history is empty</h4>
            `)
    } else {
        injectSpace.innerHTML = (`
            ${orders.sort((a, b) => b.id - a.id).reduce((acc, cur) => {
            const {id = null, order_date = '', status,} = cur
            const highlight = status === 'pending'
            const lowlight = status === 'cancelled'
            const devlight = status === 'delivered'


            const canView = true;
            let p = acc

            if (id !== null) {
                p = acc + `
                    <tr class="${highlight ? 'active-row' : 'normal-row'} ${lowlight ? 'low-row' : ' '} ${devlight ? 'dev-row' : ' '}">
                        <td>${id}</td>
                        <td>${order_date}</td>
                        <td>${capitalize(status)}</td>
                        <td>
                            <div>
                                ${canView ? `<button class="action-button viewing-button" onclick="handleView(${id})">View</button>` : ''}
                            </div>
                        </td>
                    </tr>
                `;
            } else {
                p = acc
            }
            return p;

        }, '')}

            `)
    }
}

start()