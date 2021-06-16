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

function removeParam(key, sourceURL) {
    let rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (let i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}