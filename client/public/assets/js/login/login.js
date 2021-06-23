function injectCallbackUsername() {
    const current_url = new URL(window.location.href)
    const maybeUsername = current_url.searchParams.get('username')

    if (maybeUsername) {
        // console.log(maybeUsername)
        document.getElementById('email').value = maybeUsername
    }
}

injectCallbackUsername();

function login() {
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("password").value;
    const filter = /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (email === '') {
        alert("please enter user name.");
    } else if (pwd === '') {
        alert("enter the password");
    } else if (!filter.test(email)) {
        alert("Enter valid email id.");
    } else if (pwd.length < 6) {
        alert("Password min is 6.");
    } else {
        // post
        const target_route = '/login';

        fetch(target_route, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'same-origin', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                email: email,
                password: pwd
            })
        }).then(data => {
            if (data.status >= 400) {
                throw new Error(data.statusText)
            }
            data.json().then(x => {
                // console.log(x.token)
            })
            window.location.href = "home.html"
        }).catch(err => {
            alert('Invalid username or password');
        })

    }
}

document.querySelectorAll('.login-button-true').forEach(p => {
    p.onclick = login
})