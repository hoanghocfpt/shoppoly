


function getUserData() {
  if(localStorage.getItem('token') != null){
    const token = JSON.parse(localStorage.getItem('user'));
    console.log(token);
    fetch(`http://localhost:3000/api/users/`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => reunderUserInfo(data))
  }else{
    window.location.href = '/auth/dang-nhap';
  }

}
getUserData();

function reunderUserInfo(data){
  document.querySelector('#firstname').value = data.firstname;
  document.querySelector('#lastname').value = data.lastname;
  document.querySelector('#email').value = data.email;
  document.querySelector('#phone').value = data.phone;
  document.querySelector('#phonePoint').innerHTML = data.phone;
  document.querySelector('#point').innerHTML = data.points + ' points';
  let rank = 'bronze';
  let color = `from-[#EEC88B] to-[#503B2B]`.split(' ');
  if (data.points >= 300) {
    rank = 'diamond';
    color = `from-[#b9f2ff] to-[#00acc1]`.split(' ');
  } else if (data.points >= 200) {
    rank = 'gold';
    color = `from-[#FFD700] to-[#B8860B]`.split(' ');
  } else if (data.points >= 100) {
    rank = 'silver';
    color = `from-[#C0C0C0] to-[#757575]`.split(' ');
  }

  let element = document.querySelector('#rankColor');
  color.forEach(c => element.classList.add(c));
  document.querySelector('#rankName').innerHTML = rank;
  document.querySelector('#fullname').innerHTML = data.firstname + ' ' + data.lastname;
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: `${user.phone}`,
    width: 150,
    height: 150
  });
}

// Khi người dùng click cập nhật
document.querySelector('#update').addEventListener('click', updateUserInfo);

function updateUserInfo() {
  let firstname = document.querySelector('#firstname').value;
  let lastname = document.querySelector('#lastname').value;
  let email = document.querySelector('#email').value;
  let phone = document.querySelector('#phone').value;
  let user = JSON.parse(localStorage.getItem('user'));
  fetch(`http://localhost:3000/api/users/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone
    })
  })
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('user', JSON.stringify(data));
    getUserData();
  })
}