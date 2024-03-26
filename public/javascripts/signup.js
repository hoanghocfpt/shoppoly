
function addUser(firstname, lastname, phone, points, email, password, role ){
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'firstName': firstname, 'lastName': lastname, 'phone': phone, 'email': email, 'password': password})
    }
    const res = fetch(`http://localhost:3000/api/users/`, opt)
    return res;
}


document.querySelector("#signup").addEventListener("click", (event) => {
    event.preventDefault();
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const phone = document.querySelector('#phone').value;
    const points = 0;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const role = 'user';
    console.log(firstname, lastname, phone, points, email, password, role);
    const res = addUser(firstname, lastname, phone, points, email, password, role);
    res.then(() => {
        console.log('create account success');
    })
})

