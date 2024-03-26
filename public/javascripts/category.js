const pathname = window.location.pathname; // '/category/son-kem'
const slug = pathname.split('/').pop();
console.log(slug);
const product = getCategory(slug);
const nameCate = getCategoryName(slug)
nameCate
.then(data => console.log(data))
product
    .then(data => renderProduct(data))
    .catch(error => console.log(error));
async function getCategory(slug) {
    try {
        const data = await fetch(`http://localhost:3000/api/products/category/${slug}`);
        const product = await data.json();
        return product;
    } catch (error) {``
        console.log(error);
    }   
}
async function getCategoryName(slug) {
    try {
        const data = await fetch(`http://localhost:3000/api/categories/s/${slug}`,{method: 'GET'});
        const category = await data.json(); 
        console.log(data);
        return category;
    } catch (error) {
        console.log(error);
    }   

}
function renderNameCategory(name){
    console.log(name);
    document.querySelector('#nameCategory').innerHTML = name;
}
function renderProduct(product) {
    if (product.length == 0){
        document.querySelector('#product').innerHTML = `<div class="w-full h-full flex justify-center items-center">
        <div class="text-center text-2xl">Không có sản phẩm nào</div>
    </div>`;
    }else{
        console.log(product);
        const html = document.querySelector('#product');
        product.map( e => {
            console.log(e.slug);
            priceOld = e['price-old'] != null ? `<div class="line-through text-sm">${e['price-old']}</div>` : '';
            discount = (e['price-old'] - e.price) / e['price-old'] * 100;
            discount = discount.toFixed(0);
            let sale = e['price-old'] != null ? `<div class="text-xs font-semibold bg-red-700 text-white py-1 leading-none rounded-tl-full rounded-bl-full px-2">-${discount}%</div>` : '';
            html.innerHTML += `<a class="shrink-0 max-w-[280px] w-full hover:shadow-lg rounded-md overflow-hidden group" href="/product/${e.slug}">
            <div class="w-full flex justify-center items-center">
                <img class="translate-x-[50%] group-hover:-translate-x-[50%] duration-500 h-full w-full object-cover" src="${e.image[0]}" alt="">
                <img class="translate-x-[100%] group-hover:-translate-x-[50%] duration-500 h-full w-full object-cover" src="${e.image[1]}" alt="">
            </div>
            <div class="flex flex-col justify-center px-2 py-6 items-center">
                <div class="text-center text-base font-semibold mb-3">${e.title}</div>
                <div class="flex items-center gap-2 justify-center">
                    <div class="text-sm font-bold">${e.price}đ</div>
                    <div class="line-through text-sm">${priceOld}</div>
                    ${sale}
                </div>
            </div>
        </a>`;
        });
    }
}