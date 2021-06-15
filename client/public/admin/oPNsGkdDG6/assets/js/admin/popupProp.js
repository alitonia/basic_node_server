document.querySelectorAll('.no-prop').forEach(p => {
    p.addEventListener('click', function (e) {
        e.stopPropagation(); // if this isn't called, you'll get 2 alerts when clicking on #child
    }, false);
})