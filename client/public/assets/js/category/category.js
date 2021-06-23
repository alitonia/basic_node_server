const serialize = function (obj) {
    const str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

const url = new URL(window.location)

const getCategory = async () => {
    const category_id = url.searchParams.get('category_id') || 1
    if (category_id) {
        return fetch(`/category/${category_id}`, {
            mode: 'same-origin', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
        })
            .then(x => x.json())
            .then(x => {
                if (x.error) {
                    return undefined
                }
                return x.length > 0 ? x[0] : null
            }).catch(err => {
                console.warn(err)
                return null
            })
    } else {
        return null
    }
}

const get_products = async (id) => {
    const page_number = url.searchParams.get('page') || 0
    const offset = page_number * 20;
    return fetch(`/products?category_id=${id}&offset=${offset}`, {
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    })
        .then(x => x.json())
        .then(x => {
            if (x.error) {
                return undefined
            }
            return x
        }).catch(err => {
            return null
        })
}

const toLastPage = () => {
    const url_ob = new URL(location.href)
    const current_page = url_ob.searchParams.get('page') || 0
    url_ob.searchParams.set('page', Number.parseInt(current_page) - 1)
    window.location.href = url_ob.href
}

const toNextPage = () => {
    const url_ob = new URL(location.href)
    const current_page = url_ob.searchParams.get('page') || 0
    url_ob.searchParams.set('page', Number.parseInt(current_page) + 1)
    window.location.href = url_ob.href
}

const start = async () => {
    const url_ob = new URL(location.href)
    const current_page = url_ob.searchParams.get('page') || 0

    if (Number.parseInt(current_page) === 0) {
        document.querySelector('.cb-left').remove()
    }

    const category = await getCategory()
    if (category === undefined) {
        window.location.replace('404.html')
    }
    if (category === null) {
        return;
    }
    document.querySelector('.page_name').innerText = category.name
    document.querySelector('.breadcrumb_location').innerText = category.name.toUpperCase()

    const products = await get_products(category.id)

    const p = document.querySelector('.product_item_container')

    if (products.length < 20) {
        //no more
        document.querySelector('.cb-right').remove()
    }


    products.forEach(product => {
        const pres = document.createElement("div")
        pres.className = "single_product"
        pres.innerHTML = `
                        <div class="product_image product_view_${product.id}">
                            <a href="/product.html?product_id=${product.id}">
                                <img src="${product.big_image_link}" alt=""/>
                                <div class="box_content">
                                    <div class="men_box_content_icon">
                                        <a href="#"><i class="far fa-heart"></i></a>
                                    </div>
                                    <div class="men_box_content_icon">
                                        <a href="/product.html?product_id=${product.id}"><i class="fas fa-cart-plus"></i></a>
                                    </div>
                                    <div class="men_box_content_icon">
                                        <a href="/products.html"><i class="fas fa-search"></i></a>
                                    </div>
                                </div>

                                <div class="product_text_info">
                                    <h4>
                                        <a href="/product.html?product_id=${product.id}" class="product_title">${product.name}</a>
                                    </h4>
                                    <span class="price">$${(product.price).toFixed(2)}</span>
                                </div>
                            </a>
                        </div>
                `

        p.appendChild(pres)

    })
}

start();


quickAttach('.cb-left', toLastPage)
quickAttach('.cb-right', toNextPage)