async function getCategories() {
    try {
        const data = await fetch('http://localhost:3000/api/categories');
        const categories = await data.json();
        let html = ``;
        categories.forEach(e => {
            if(e.status === 'public'){
                html += `<a href="category/${e.slug}" class="group shrink-0 ease-linear duration-100 hover:-translate-y-1.5 flex flex-col w-36 border border-gray-300 text-center rounded-lg overflow-hidden">
                            <img class="w-full" src="${e.thumbnail}" alt="">
                            <span class="text-base group-hover:font-bold mb-5">${e.name}</span>
                        </a>`;
            }
        });
        document.querySelector('#featuredCategories').innerHTML = html;
    } catch (error) {
        console.log(error);
    }
}

getCategories();



// sản phẩm
async function getSanPhamBanChay() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();
        renderSanPhamBanChay(products);
    } catch (error) {
        console.log(error);
    }
}

getSanPhamBanChay();

function renderSanPhamBanChay(data){
    console.log(data.reverse());
    let html = '';
    data.map((e)=>{
        priceOld = e['price-old'] != null ? `<div class="line-through text-sm">${e['price-old']}</div>` : '';
        discount = (e['price-old'] - e.price) / e['price-old'] * 100;
        discount = discount.toFixed(0);
        let sale = e['price-old'] != null ? `<div class="text-xs font-semibold bg-red-700 text-white py-1 leading-none rounded-tl-full rounded-bl-full px-2">-${discount}%</div>` : '';
        html += `<a class="shrink-0 max-w-[280px] w-full hover:shadow-lg rounded-md overflow-hidden group relative" href="product/${e.slug}">
        <!-- <button class="absolute top-[15px] right-[15px] z-10">
            <svg width="24" height="24" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7858 26C14.2619 26 13.738 25.8422 13.2869 25.5124C11.5696 24.2648 8.26609 21.7408 5.3846 18.7579C1.81912 15.0436 0 11.7739 0 9.03475C0 4.04413 3.85654 0 8.58626 0C10.9438 0 13.1704 1.00386 14.7858 2.79647C16.4158 1.00386 18.6424 0 20.9999 0C25.7297 0 29.5862 4.04413 29.5862 9.03475C29.5862 11.7739 27.7671 15.0436 24.1871 18.7579C21.3201 21.7408 18.002 24.2791 16.2848 25.5124C15.8482 25.8422 15.3097 26 14.7858 26ZM8.58626 1.00386C4.40955 1.00386 1.01871 4.60342 1.01871 9.03475C1.01871 14.9288 10.8711 22.5295 13.8981 24.7093C14.4366 25.0965 15.1497 25.0965 15.6881 24.7093C18.7151 22.5295 28.5675 14.9288 28.5675 9.03475C28.5675 4.60342 25.1767 1.00386 20.9999 1.00386C18.7588 1.00386 16.6341 2.05074 15.1933 3.88638L14.7858 4.38831L14.3783 3.88638C12.9522 2.05074 10.8274 1.00386 8.58626 1.00386Z" fill="black"></path></svg>
        </button> -->
        <div class="w-full flex justify-center items-center">
            <img class="translate-x-[50%] group-hover:-translate-x-[50%] duration-100 h-full w-full object-cover" src="${e.image[0]}" alt="">
            <img class="translate-x-[100%] group-hover:-translate-x-[50%] duration-100 h-full w-full object-cover" src="${e.image[1]}" alt="">
        </div>
        <div class="flex flex-col justify-center px-2 py-6 items-center">
            <div class="text-center text-base font-semibold mb-3">${e.title}</div>
            <div class="flex items-center gap-2 justify-center">
                <div class="text-sm font-bold">${e.price}đ</div>
                <div class="line-through text-sm">${e['price-old']}đ</div>
                ${sale}
            </div>
        </div>
    </a>`;
    })
    document.querySelector('#topProducts').innerHTML = html;
}