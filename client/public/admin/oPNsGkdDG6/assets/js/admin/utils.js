const capitalize = (str) => str && str.length > 0 ? str[0].toUpperCase() + str.slice(1,) : ''
const reload = () => window.location.reload()
const preventPropagation = (e) => e.stopPropagation()

const current_url_object = new URL(window.location.href)

const getParam = (field, defaultValue = null) => {
    return current_url_object.searchParams.get(field) || defaultValue
}

const url_mutation = (newParams = {}) => {
    const current_url_object = new URL(window.location.href)
    Object.entries(newParams).forEach(([key, value]) => {
        current_url_object.searchParams.set(key, value)
    })
    return current_url_object.href
}

const changePage = (link) => window.location.href = link