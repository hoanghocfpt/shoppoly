document.addEventListener('DOMContentLoaded', (event) => {
    getUser();
}); 
function setCart(bolean){
    if(bolean){
        document.querySelector('#cart').classList.remove('hidden');
        document.querySelector('#cart').classList.add('flex');
    }else{
        document.querySelector('#cart').classList.add('hidden');
        document.querySelector('#cart').classList.remove('flex');
    }
}

var cart = []
function loadCart(){
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
        document.querySelector('#carts').innerHTML = html;
        document.querySelector('#total').innerHTML = total + 'đ';
    }else{
        console.log('null');
    }
}


loadCart();

function minusProduct(id){
    cart.map((e)=>{
        if(e.id == id){
            if(e.quantity > 1){
                e.quantity--;
            }
        }
    })
    localStorage.setItem('cart',JSON.stringify(cart));
    console.log('minus');
    loadCart();
    if(loadCartToCheckout){
        loadCartToCheckout();
    }
}

function deleteProduct(id){
    cart.map((e)=>{
        if(e.id == id){
            cart.splice(cart.indexOf(e),1);
        }
    })
    localStorage.setItem('cart',JSON.stringify(cart));
    loadCart();
    if(loadCartToCheckout){
        loadCartToCheckout();
    }

}

function plusProduct(id){
    cart.map((e)=>{
        if(e.id == id){
            e.quantity++;
        }
    })
    localStorage.setItem('cart',JSON.stringify(cart));
    loadCart();
    if(loadCartToCheckout){
        loadCartToCheckout();
    }
}

function getUser(){
    if(localStorage.getItem('user') != null){
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user.firstName);
        document.querySelector('#user').insertAdjacentHTML('beforeend', `<a class="flex items-center gap-2" href="/khach-hang">${user.firstName}</a>`);
    }else{
        document.querySelector('#user').insertAdjacentHTML('beforeend', `<a class="flex items-center gap-2" href="/auth/dang-nhap">
        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 0C6.50896 0 0 6.50896 0 14.5C0 22.491 6.50896 29 14.5 29C22.491 29 29 22.491 29 14.5C29 6.50896 22.5063 0 14.5 0ZM14.5 1.06955C21.9104 1.06955 27.9305 7.08957 27.9305 14.5C27.9305 17.7392 26.7845 20.7034 24.8746 23.0258C24.3093 21.1006 23.148 19.3588 21.4979 18.0448C20.2908 17.0669 18.8699 16.3641 17.3419 15.9821C19.2366 14.9737 20.52 12.9721 20.52 10.6802C20.52 7.36459 17.8156 4.66017 14.5 4.66017C11.1844 4.66017 8.47998 7.33404 8.47998 10.6649C8.47998 12.9568 9.76344 14.9584 11.6581 15.9668C10.1301 16.3488 8.70917 17.0516 7.50211 18.0295C5.86723 19.3435 4.69073 21.0854 4.12539 23.0105C2.21549 20.6881 1.06955 17.7239 1.06955 14.4847C1.08483 7.08957 7.10485 1.06955 14.5 1.06955ZM14.5 15.6154C11.765 15.6154 9.54952 13.3999 9.54952 10.6649C9.54952 7.92993 11.765 5.71444 14.5 5.71444C17.235 5.71444 19.4505 7.92993 19.4505 10.6649C19.4505 13.3999 17.235 15.6154 14.5 15.6154ZM14.5 27.9152C10.7871 27.9152 7.42571 26.4025 4.99631 23.9578C5.40885 21.9868 6.52423 20.1839 8.17439 18.8546C9.9315 17.4489 12.1776 16.6697 14.5 16.6697C16.8224 16.6697 19.0685 17.4489 20.8256 18.8546C22.4758 20.1839 23.5911 21.9868 24.0037 23.9578C21.5743 26.4025 18.2129 27.9152 14.5 27.9152Z" fill="black"></path></svg>
        <span class="text-sm font-semibold">Đăng nhập</span>
    </a>`);
    }
}
