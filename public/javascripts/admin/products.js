
function getCategories() {
    fetch(`http://localhost:3000/api/categories`,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => getProducts(data))
}
getCategories();
function getProducts(categories) {
    fetch(`http://localhost:3000/api/products`,{
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => renderProducts(data, categories))
}
function renderProducts(data, categories) {
    let html = '';
    
    data.forEach(product => {


        html += `  <tr class="text-gray-700">
        <td class="px-4 py-3 w-[100px]">
          <p class="font-semibold truncate ... w-[100px]">#${product._id}</p>
        </td>
        <td class="px-4 py-3 flex gap-2 items-center">
              <img src="${product.image[0]}" alt="image" class="w-14 h-14 rounded-lg">
              <a class="text-sm underline font-semibold" href="/admin/products/${product._id}">${product.title}</a>
        </td>
        <td class="px-4 py-3 text-sm">
        <p class="font-medium">${product.price}đ</p>
       <del class="text-gray-500">${product['price-old']}đ</del>
        </td>
        <td class="px-4 py-3 text-sm">
            ${product.category}
        </td>
      </tr>`;
    });

    document.querySelector('#products').innerHTML = html;
}
