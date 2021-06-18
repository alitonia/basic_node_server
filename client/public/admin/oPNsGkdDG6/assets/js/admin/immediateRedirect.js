if (!isLogin) {
    window.location.replace('/404.html')
}

function checkLogin() {
    const structuredCookie = parseCookie(document.cookie)
    const token = structuredCookie['admin_token']
    const isLogin = !!token

    if (!isLogin) {
        alert('Your session has expired. Please login again to continue.')
        window.location.href = '/'
    }
}

setInterval(checkLogin, 1000 * 60 * 10) //10 mins

