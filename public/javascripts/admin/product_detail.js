
const pathname = window.location.pathname; 
const id = pathname.split('/').pop();
console.log(id);
const product = getProduct(id);
product
    .then(data => renderProduct(data))
    .catch(error => console.log(error));
async function getProduct(id) {
    try {
        const data = await fetch(`http://localhost:3000/api/products/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const product = await data.json();
        console.log(product);
        return product;
    } catch (error) {
        console.log(error);
    }   
}

async function getCategories() {
    try {
        const data = await fetch(`http://localhost:3000/api/categories`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const categories = await data.json();
        console.log(categories);
        return categories;
    } catch (error) {
        console.log(error);
    }   
}


function renderProduct(product) {
    const slug = document.querySelector('#slug');
    const linkProduct = document.querySelector('#link_product')
    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const priceOld = document.querySelector('#price-old');
    const origin = document.querySelector('#origin');
    const brand = document.querySelector('#brand');
    const category = document.querySelector('#category');


    const images = document.querySelector('#images');
    slug.value = product.slug;
    console.log(product.slug);
    linkProduct.setAttribute('href', `/product/${product.slug}`)
    category.value = product.category
    title.value = product.title;
    price.value = product.price;
    if (product['price-old'] != null){
        priceOld.value = product['price-old'];
    }
    origin.value = product['other-attributes'].origin;
    brand.value = product['other-attributes'].brand;
    product.image.forEach(e => {
        images.innerHTML += `<div class="w-[200px] border border-gray-200 rounded-sm cursor-pointer">
        <img class="w-full" src="${e}" alt="">
    </div>`;
    });
}



function updateProduct(id, slug, title, price, priceOld, origin, brand){
    const token = JSON.parse(localStorage.getItem('token'));
    const opt = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token.accessToken
        },
        body: JSON.stringify({
            slug: slug,
            title: title,
            price: price,
            'price-old': priceOld,
            'other-attributes': {
                origin: origin,
                brand: brand
            }
        })
    }
    const res = fetch(`http://localhost:3000/api/products/${id}`, opt)
    return res;
}

function createSlug(title) {
    return title
        .normalize('NFD') // Chuyển đổi chuỗi sang dạng chuẩn Unicode NFD, phân tách các ký tự có dấu thành ký tự gốc và dấu.
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ tất cả các dấu điều khiển Unicode (dấu).
        .toLowerCase() // Chuyển đổi tất cả ký tự trong chuỗi thành chữ thường.
        .trim() // Loại bỏ khoảng trắng ở đầu và cuối chuỗi.
        .replace(/[^a-z0-9 ]/g, '') // Loại bỏ tất cả ký tự không phải là chữ cái hoặc số.
        .replace(/\s+/g, '-'); // Thay thế một hoặc nhiều khoảng trắng bằng dấu gạch ngang.
}


document.querySelector('#update').addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const slug = createSlug(title)
    const price = document.querySelector('#price').value;
    const priceOld = document.querySelector('#price-old').value;
    const origin = document.querySelector('#origin').value;
    const brand = document.querySelector('#brand').value;
    const res = updateProduct(id, slug, title, price, priceOld, origin, brand);
    res.then(() => {
        alert('Update category successfully');
    })
})


// delete caqtegory
function deleteProduct(id){
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token.accessToken,
            },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

document.querySelector('#delete').addEventListener('click', (event) => {
    event.preventDefault();
    deleteProduct(id);
    window.location.href = `/admin/products`
   
})



function refreshToken () {
    const refreshToken = JSON.parse(localStorage.getItem('token')).refreshToken;
    const data = fetch('/api/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({refreshToken})
    })
    return data
}

function saveLocal(data){
    localStorage.setItem('token', JSON.stringify({accessToken: data.accessToken, refreshToken: data.refreshToken}));
}