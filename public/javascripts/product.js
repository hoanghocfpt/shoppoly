loadCart();
const slug = window.location.pathname.split('/')[2];
console.log(slug);
const product = getProduct(slug);
product
    .then(data => renderProduct(data))
    .catch(error => console.log(error));
async function getProduct(slug) {
    try {
        const data = await fetch(`http://localhost:3000/api/products/s/${slug}`);
        const product = await data.json();
        return product;
    } catch (error) {
        console.log(error);
    }   
}

function renderProduct(product) {
    console.log(product);
    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const priceOld = document.querySelector('#price-old');
    const origin = document.querySelector('#origin');
    const brand = document.querySelector('#brand');
    const imagesBig = document.querySelector('#images-big');
    const imagesSmall = document.querySelector('#images-small');
    const addToCart = document.querySelector('#addToCart');
    title.innerHTML = product.title;
    price.innerHTML = product.price + 'đ';
    if (product['price-old'] != null){
        priceOld.innerHTML = product['price-old'] + 'đ';
    }
    origin.innerHTML = product['other-attributes'].origin;
    brand.innerHTML = product['other-attributes'].brand;
    product.image.forEach(e => {
        imagesBig.innerHTML += `<div class="w-full shrink-0 h-full flex justify-center items-center">
        <img class="h-full" src="${e}" alt="">
    </div>`;
        imagesSmall.innerHTML += `<div class="w-full border-2 border-gray-500">
        <img class="w-full" src="${e}" alt="">
    </div>`;
    });
    addToCart.setAttribute('onclick', `addToCart(${product.id}, '${product.image}', '${product.title}', ${product.price}, 1)`);
}

var cart = []
function loadCart(){
    if(localStorage.getItem('cart') != null){
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        let html = '';
        // render cart
        cart.map((e)=>{
            html += `<div class="flex items-center py-3">
            <div class="mr-2">
            <img class="h-[100px]" src="${e.image}" alt="">
            </div>
            <div class="flex-1">
            <div class="flex justify-between gap-2 items-start">
            <div class="font-medium mb-2 text-sm">${e.title}</div>
            <button onclick="minusProduct(${e.id})" class="bg-gray-300 p-1 rounded-full">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="minus" width=".8em" height=".8em" fill="currentColor" aria-hidden="true"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
            </button>
            </div>
            <div class="flex justify-between items-end">
            <div class="w-[90px] h-[36px] gap-2 flex justify-between items-center border-[1.5px] border-gray-200 py-2 px-4 rounded-full">
            <button>
            <span onclick="plusProduct(${e.id})" >
            <svg width="10" height="10" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2L1 0ZM13 2C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 0 13 0V2ZM1 2L13 2V0L1 0L1 2Z" fill="black"></path></svg>
            </span>
            </button>
            <input disabled class="bg-transparent text-center font-bold text-sm w-[20px] outline-none border-none" type="text" name="" id="" value="1">
            <button>
            <span>
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6C0.447715 6 0 6.44772 0 7C0 7.55228 0.447715 8 1 8L1 6ZM13 8C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6V8ZM1 8L13 8V6L1 6L1 8Z" fill="black"></path><path d="M6 13C6 13.5523 6.44772 14 7 14C7.55228 14 8 13.5523 8 13L6 13ZM8 1C8 0.447715 7.55228 -2.41411e-08 7 0C6.44771 2.41411e-08 6 0.447715 6 1L8 1ZM8 13L8 1L6 1L6 13L8 13Z" fill="black"></path></svg>
            </span>
            </button>
            </div>
            <div class="text-base font-medium">${e.price}đ</div>
            </div>
            </div>
            </div>`
        })
        document.querySelector('#carts').innerHTML = html;
    }else{
        console.log('null');
    }
}

// add to cart
function addToCart(id, image, title, price, quantity){
    let productExists = false;
    cart.forEach((item) => {
        if(item.id === id){
            item.quantity += quantity;
            productExists = true;
        }
    });

    if(!productExists){
        const product = {
            id: id,
            image: image,
            title: title,
            price: price,
            quantity: quantity
        };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    setCart(true);
}

function setCart(bolean){
    if(bolean){
        document.querySelector('#cart').classList.remove('hidden');
        document.querySelector('#cart').classList.add('flex');
    }else{
        document.querySelector('#cart').classList.add('hidden');
        document.querySelector('#cart').classList.remove('flex');
    }
}
