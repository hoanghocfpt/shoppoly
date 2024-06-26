

const id = window.location.href.split('/').pop();
console.log(id);
const category = getCategory(id);
category
    .then(data => renderCategory(data))
    .catch(error => console.log(error));
async function getCategory(id) {
    try {
        const data = await fetch(`http://localhost:3000/api/categories/${id}`);
        const category = await data.json();
        return category;
    } catch (error) {
        console.log(error);
    }   
}
let imgNew = false
let newThumbnail = null
document.querySelector('#thumbnail-review-new').addEventListener('change', (event) => {
    const { files } = event.target;
    imgNew = true
    const reader = new FileReader();
    reader.readAsDataURL(files[0])
    console.log(newThumbnail);
    reader.addEventListener("load", (event) => {
        const img = event.target.result;
        document.querySelector('#thumbnail-review-img').setAttribute('src', img);
    })
    uploadFile()
})


function uploadFile() {
    const fileInput = document.querySelector('#thumbnail-review-new');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file); // Thêm file vào FormData
    formData.append('name', 'avatar'); // Bạn cũng có thể thêm dữ liệu khác vào FormData như thế này
   
    fetch('/api/categories/images', {
        method: 'POST',
        body: formData // Sử dụng formData trực tiếp làm body
    })
    .then(response => response.json())
    .then(result => {
        console.log('File đã được upload thành công:', result.path);
        newThumbnail = result.path
    })
    .catch(error => {
        console.error('Có lỗi xảy ra:', error);
    });
}


function renderCategory(category) {
    const thumbnail = document.querySelector('#thumbnail-review-img');
    const name = document.querySelector('#name');
    const status = document.querySelector('#status');
    name.value = category.name;
    console.log(category.thumbnail);
    thumbnail.setAttribute('src', category.thumbnail);  
    status.value = category.status;
    console.log(category);
}


function updateCategory(id, slug, name, thumbnail, status) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
        alert('Bạn không có quyền truy cập. Vui lòng đăng nhập');
        window.location.href = '/admin/categories';
    }

    try {
        const res = fetch(`/api/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token.accessToken
            },
            body: JSON.stringify({ id, slug, name, thumbnail, status })
        });

        return res.then(res => {
            if (res.status === 403) {
                return refreshToken()
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        saveLocal(data);
                        return updateCategory(id, slug, name, thumbnail, status);
                    });
            }
            return res;
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

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

document.querySelector('#update').addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    let thumbnail = document.querySelector('#thumbnail').value;
    if(imgNew){
        thumbnail = '/'+newThumbnail.substring("public\\".length).replace(/\\/g, "/");
    }
    const slug = name.toLowerCase().replace(/ /g, '-');
    const status = document.querySelector('#status').value;
    console.log(slug,name,thumbnail,status);
    const res = updateCategory(id,slug,name,thumbnail,status);
    res.then(() => {
        console.log(res);
        alert('Update category successfully');
    })
})


// delete caqtegory
function deleteCategory(id){
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
        alert('Bạn không có quyền truy cập. Vui lòng đăng nhập');
        window.location.href = '/admin/categories';
    }
    fetch(`http://localhost:3000/api/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token.accessToken,
            },
    })
    .then(data => {
        console.log(data);
        if (data.status === 403) {
            refreshToken()
            .then(res => res.json())
            .then(dataToken => {
                saveLocal(dataToken);
                deleteCategory(id);
            });
        }
        return data;
    })
    .catch(error => console.error('Error:', error));
}

document.querySelector('#delete').addEventListener('click', (event) => {
    event.preventDefault();
    deleteCategory(id);
    alert('Delete category successfully');
    window.location.href = `/admin/categories`
   
})