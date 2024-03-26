var cart = []
function loadCartToCheckout(){
    let total = 0;
    if(localStorage.getItem('cart') != null){
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        let html = '';
        // render cart
        cart.map((e)=>{
            total += e.price * e.quantity;
            html += `<div class="flex items-center py-3">
            <div class="mr-2">
            <img class="h-[100px]" src="${e.image}" alt="">
            </div>
            <div class="flex-1">
            <div class="flex justify-between gap-2 items-start">
            <div class="font-medium mb-2 text-sm">${e.title}</div>
            <button  onclick="deleteProduct(${e.id})"  class="bg-gray-300 p-1 rounded-full">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="minus" width=".8em" height=".8em" fill="currentColor" aria-hidden="true"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
            </button>
            </div>
            <div class="flex justify-between items-end">
            <div class="w-[90px] h-[36px] gap-2 flex justify-between items-center border-[1.5px] border-gray-200 py-2 px-4 rounded-full">
            <button  onclick="minusProduct(${e.id})">
            <span>
            <svg width="10" height="10" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2L1 0ZM13 2C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 0 13 0V2ZM1 2L13 2V0L1 0L1 2Z" fill="black"></path></svg>
            </span>
            </button>
            <input disabled class="bg-transparent text-center font-bold text-sm w-[20px] outline-none border-none" type="text" name="" id="" value="${e.quantity}">
            <button  onclick="plusProduct(${e.id})" >
            <span>
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6C0.447715 6 0 6.44772 0 7C0 7.55228 0.447715 8 1 8L1 6ZM13 8C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6V8ZM1 8L13 8V6L1 6L1 8Z" fill="black"></path><path d="M6 13C6 13.5523 6.44772 14 7 14C7.55228 14 8 13.5523 8 13L6 13ZM8 1C8 0.447715 7.55228 -2.41411e-08 7 0C6.44771 2.41411e-08 6 0.447715 6 1L8 1ZM8 13L8 1L6 1L6 13L8 13Z" fill="black"></path></svg>
            </span>
            </button>
            </div>
            <div class="text-base font-medium">${e.price * e.quantity}đ</div>
            </div>
            </div>
            </div>`
        })
        document.querySelector('#checkoutProducts').innerHTML = html;
        document.querySelector('#totalAll').innerHTML = total + 'đ';
        document.querySelector('#transportfee').innerHTML = '0đ';
        document.querySelector('#totalOrder').innerHTML = `${total}đ`;
    }else{
        console.log('null');
    }
}


loadCartToCheckout();


// load info user
if(localStorage.getItem('user') != null){
    let user = JSON.parse(localStorage.getItem('user'));
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#email').value = user.email;
    document.querySelector('#phone').value = user.phone;
    document.querySelector('#loginWith').innerHTML = `<p class="mb-4">Bạn đã đăng nhập với tài khoản <span class="underline">${user.email}</span>. <a class="font-medium" href="/logout.html">Đăng xuất</a></p>`
}


// create order
document.querySelector('#order').addEventListener('click',()=>{
    getData();
})
function getData(){
    let userId = JSON.parse(localStorage.getItem('user')).id;
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let province = document.querySelector('#province').value;
    let district = document.querySelector('#district').value;
    let street = document.querySelector('#street').value;
    let total = document.querySelector('#totalOrder').innerHTML;
    let paymentAll = document.getElementsByName('payment');
    let paymentmethod
    paymentAll.forEach(e => {
        if(e.checked){
            paymentmethod = e.value
        }
    });
    let data = {
        user: userId,
        status: `Đang xử lý`,
        products: cart,
        customerinfo: {
            fullname: `${firstname} ${lastname}`,
            phone: phone,
            email: email
        },
        address: `${street}, ${district}, ${province}`,
        payment: paymentmethod,
        total: total,
        created: `${new Date().toISOString()}`
    }

    createOrder(data)
    .then((res)=>{
        console.log(res);
        localStorage.removeItem('cart');
        window.location.href = '/order-success.html';
    })
    .catch((error)=>{
        console.log(error);
    })
}

async function createOrder(data) {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    const res = fetch(`http://localhost:3000/orders/`, opt)
    return res;
}

