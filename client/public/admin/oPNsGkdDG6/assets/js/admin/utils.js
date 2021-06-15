const capitalize = (str) => str && str.length > 0 ? str[0].toUpperCase() + str.slice(1,) : ''
const reload = () => window.location.reload()
const preventPropagation = (e) => e.stopPropagation()