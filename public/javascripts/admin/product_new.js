
function addProduct(title, slug, price, priceOld, origin, brand, category, images){
    console.log(title,slug,price, priceOld, origin, brand, category, images)
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            slug: slug,
            title: title,
            price: price,
            'price-old': priceOld,
            'other-attributes': {
                origin: origin,
                brand: brand
            },
            category: category,
            image: images
        })
    }
    const res = fetch(`http://localhost:3000/api/products/`, opt)
    return res;
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
// let thumbnail = null
// document.querySelector("#thumbnail").addEventListener("change", (event) => {
// 	const { files } = event.target;
//     const reader = new FileReader();
// 	reader.readAsDataURL(files[0])
//     thumbnail = '/images/categories/'+files[0].name;
// 	reader.addEventListener("load", (event) => {
// 		const img = event.target.result;
//         document.querySelector('#thumbnail-preview').innerHTML = `                            <img id="" class="w-32 h-32 object-cover rounded-lg" src="${img}" alt="" />`
// 	})
// })
// let status = 'public';
// document.querySelector('#status').addEventListener('change', (event) => {
//     status = event.target.value;
// }
// )
function createSlug(title) {
    return title
    .normalize('NFD') // Chuyển đổi chuỗi sang dạng chuẩn Unicode NFD, phân tách các ký tự có dấu thành ký tự gốc và dấu.
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ tất cả các dấu điều khiển Unicode (dấu).
    .toLowerCase() // Chuyển đổi tất cả ký tự trong chuỗi thành chữ thường.
    .trim() // Loại bỏ khoảng trắng ở đầu và cuối chuỗi.
    .replace(/[^a-z0-9 ]/g, '') // Loại bỏ tất cả ký tự không phải là chữ cái hoặc số.
    .replace(/\s+/g, '-'); // Thay thế một hoặc nhiều khoảng trắng bằng dấu gạch ngang.
}


let imagePaths = [];
document.getElementById('image-input').addEventListener('change', function(e) {
    const files = e.target.files; // Get the selected files
    const preview = document.getElementById('preview');
    const reader = new FileReader()
    uploadFiles();
    preview.innerHTML = ''; // Clear existing previews
    imagePaths = []; 
    // Loop through all selected files
    for (const file of files) {
        // Only process image files.
        if (!file.type.startsWith('image/')){ continue; }  
        // Define what happens on successful data read
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.width = '100px'; // Set the width of the preview image
            img.style.height = 'auto';
            preview.appendChild(img); // Add the image to the preview container
        };
        
        // Read the image file as a data URL.
        reader.readAsDataURL(file);
    }
});

getCategories()
.then(categories => {
    console.log(categories); // Xử lý categories ở đây
    let html = categories.map((e) => {
        return `<option value="${e.slug}">${e.name}</option>`; // Thêm return ở đây
    }).join(''); // Sử dụng join('') để chuyển mảng thành chuỗi
    document.querySelector('#category').innerHTML = html;
})
.catch(error => {
    console.error('Failed to load categories:', error);
});



let productPaths = []
function uploadFiles() {
    const fileInput = document.querySelector('#image-input');
    const files = fileInput.files; // Lấy tất cả các tệp đã chọn
    
    const formData = new FormData(); // Khởi tạo FormData mà không cần tham số
    
    // Lặp qua từng tệp và thêm vào FormData
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]); // Thêm từng file vào FormData với cùng một tên 'files[]'
    }
    
    fetch('/api/products/images', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Giả sử phản hồi là JSON
    .then(result => {
        console.log('Các file đã được upload thành công:', result);
        result.forEach(e => {
            let path = '/'+e.path.substring("public\\".length).replace(/\\/g, "/");
            productPaths.push(path)
        });
        console.log(productPaths);
    })
    .catch(error => {
        console.error('Có lỗi xảy ra:', error);
    });
}


document.querySelector('#add').addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const slug = createSlug(title)
    const price = document.querySelector('#price').value
    const priceOld = document.querySelector('#price-old').value
    const origin = document.querySelector('#origin').value
    const brand = document.querySelector('#brand').value
    const category = document.querySelector('#category').value
    const images = productPaths
    console.log(images);
    const res = addProduct(title,slug,price,priceOld,origin,brand,category,images);
    res.then((data) => {
        console.log(data);
        alert('Tạo sản phẩm thành công!!!')
    })
})