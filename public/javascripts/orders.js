
function getUserData() {
    if(localStorage.getItem('user') != null){
      user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => reunderUserInfo(data))
    }else{
      window.location.href = '/login.html';
    }
  
}
getUserData();

function reunderUserInfo(data){
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

getOrder()
//  get order
function getOrder(){
    let user = JSON.parse(localStorage.getItem('user'));
    fetch(`http://localhost:3000/orders?user=${user.id}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => renderOrder(data))
}

function renderOrder(data){
    console.log('ok');
    let html = '';
    if(data.length == 0){
        html += `<div class="text-center text-2xl">Bạn chưa có đơn hàng nào</div>`;
    }else{
        data.map((e)=>{
            let products = '';
            e.products.map((p)=>{
                products += `
                <div class="flex flex-col py-3">
                    <div class="mr-2 flex">
                        <img class="h-[50px]" src="${p.image}" alt="">
                        <div class="font-medium mb-2 text-sm">${p.title}</div>
                    </div>
                </div>`
            })  
            html += ` <tr class="text-gray-700">
            <td class="px-4 py-3">
              <p class="font-semibold">#${e.id}</p>
            </td>
            <td class="px-4 py-3 flex gap-2 items-center">
            <p class="font-semibold text-sm">${e.created}</p>
            </td>
            <td class="px-4 py-3 text-sm">
                <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full">${e.status}</span>
            </td>
            <td class="px-4 py-3 text-sm">
            ${e.total}
            </td>
            <td class="px-4 py-3 text-sm">
                ${products}
            </td>
          </tr>`;
        })
    }
    document.querySelector('#orderList').innerHTML = html;
}