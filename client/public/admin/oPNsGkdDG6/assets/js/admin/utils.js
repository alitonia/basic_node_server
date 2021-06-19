const capitalize = (str) => str && str.length > 0 ? str[0].toUpperCase() + str.slice(1,) : ''

const reload = (scrollToClass) => {
    if (!scrollToClass) {
        window.location.reload()
    } else{
        window.location.href = url_mutation({target: scrollToClass})
    }
}

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

const openNewTab = (link) => window.open(link, '_blank')

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

const fileTypes = [
    "image/jpeg",
    "image/pjpeg",
    "image/png",
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

function returnFileSizeString(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}

function returnFileSizeInKB(number) {
    return (number / 1024).toFixed(1);
}


const tryParse = (x, fallback = null) => {
    try {
        return JSON.parse(x)
    } catch (e) {
        console.log(e)
        return fallback
    }
}

function isColor(value = '') {
    return /^#[abcedfABCDEF0-9]{3,8}$/.test(value)
}