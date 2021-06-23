function quickAttach(selector, f) {
    document.querySelectorAll(selector).forEach(p => {
        p.onclick = f
    })
}

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

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null
    }
}

const checkLogin = (type = 'customer') => {
    if (!structuredCookie || !structuredCookie.token) {
        return false
    }

    const neededField = (type === 'customer') ? 'id' : 'admin_id'
    const token = structuredCookie['token']
    const tokens = token instanceof Array ? token : [token]

    return tokens.reduce((acc, cur) => {
        const parsedJWT = parseJwt(cur)
        return acc || (parsedJWT && parsedJWT.user && parsedJWT.user[neededField])
    }, false)
}

const isLogin = checkLogin()

function deleteCookie(path) {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${path || ''}`;
}

function handleLogout() {
    deleteCookie()
    document.location.replace(window.location.href)
}

function loginUpperBar() {
    const x = document.querySelector('.sign_in_up')
    if (x) {
        x.innerHTML = `
        <div class="log_out">
            <a class="logout-able">
                <h3>Log out</h3>
            </a>
        </div>
        `
        quickAttach('.logout-able', handleLogout)
    }
}

if (isLogin) {
    loginUpperBar()
    const l = document.querySelector('.cart_button')
    if (l) {
        l.style.display = 'initial'
    }
} else {
    const l = document.querySelector('.cart_button')
    if (l) {
        l.style.display = 'none'
    }
}
