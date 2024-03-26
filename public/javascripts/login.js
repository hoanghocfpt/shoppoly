
async function login(email, password) {
    const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res;
}

if(localStorage.getItem('user') != null){
    window.location.href = 'index.html';
}



function saveLocal(data){
    localStorage.setItem('user', JSON.stringify(data));
}


document.querySelector("#login").addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const res = login(email,password);
    res.then(data => data.json())
    .then(data => data.accessToken != undefined && sessionStorage.setItem('token', data.accessToken)) 
})

