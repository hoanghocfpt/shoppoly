// get danh mục
async function getCategories() {
    try {
        const data = await fetch(`http://localhost:3000/api/categories`);
        const category = await data.json();
        return category;
    } catch (error) {
        console.log(error);
    }       

}
const categoryData = getCategories()
categoryData.then(data => renderCategories(data))
// get sản phẩm

async function getProducts(category) {
    try {
        const data = await fetch(`http://localhost:3000/api/products?category=${category}`);
        const product = await data.json();
        return product;
    } catch (error) {
        console.log(error);
    }   
}
async function renderCategories(data) {
    let html = '';
    // Tạo một mảng các Promise để lấy số lượng sản phẩm cho mỗi danh mục
    const countsPromises = data.map(async category => {
        const products = await getProducts(category._id);
        return products.length; // Trả về số lượng sản phẩm
    });

    // Đợi tất cả các Promise được giải quyết và nhận được mảng các số lượng sản phẩm
    const counts = await Promise.all(countsPromises);

    // Tạo chuỗi HTML với số lượng sản phẩm tương ứng
    data.forEach((category, index) => {
        const count = counts[index]; // Lấy số lượng sản phẩm từ mảng counts
        html += `  <tr class="text-gray-700">
        <td class="px-4 py-3 w-[100px]">
          <p class="font-semibold w-[100px] truncate ...">#${category._id}</p>
        </td>
        <td class="px-4 py-3 flex gap-2 items-center">
              <img src="${category.thumbnail}" alt="image" class="w-14 h-14 rounded-lg">
              <a class="text-sm underline font-semibold" href="./category/${category._id}">${category.name}</a>
        </td>
        <td class="px-4 py-3 text-sm">
        ${category.status === 'public' ? `<span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
        Công khai
      </span>` : `<span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
      Riêng tư
    </span>`}
          
        </td>
        <td class="px-4 py-3 text-sm">
         ${count}
        </td>
      </tr>`;
    });

    document.querySelector('#categories').innerHTML = html;
}
