const toLastPage = () => {
    const url_ob = new URL(location.href)
    const current_page = url_ob.searchParams.get('page') || 0
    url_ob.searchParams.set('page', Number.parseInt(current_page) - 1)
    url_ob.searchParams.set('target', '')
    window.location.href = url_ob.href
}

const toNextPage = () => {
    const url_ob = new URL(location.href)
    const current_page = url_ob.searchParams.get('page') || 0
    url_ob.searchParams.set('page', Number.parseInt(current_page) + 1)
    url_ob.searchParams.set('target', '')
    window.location.href = url_ob.href
}