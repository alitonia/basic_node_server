const parseCookie = str => {
    if (str === '') {
        return {}
    }
    return str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            const key = decodeURIComponent(v[0].trim())
            acc[key] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
}

const structuredCookie = parseCookie(document.cookie)
const isLogin = !!structuredCookie['admin_token']

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function deleteCookie1(path) {
    document.cookie = `admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin`;
}

function logout() {
    deleteCookie1()
    window.location.href = './login.html'
}
