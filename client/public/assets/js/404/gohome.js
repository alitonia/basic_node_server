const gohome = () => {
    window.location.href = '/home.html'
}

document.querySelectorAll('.wanna-go-home').forEach(p => {
    p.onclick = gohome
})