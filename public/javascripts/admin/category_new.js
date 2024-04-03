const token = JSON.parse(localStorage.getItem('token'));
if (!token) {
    alert('Bạn không có quyền truy cập. Vui lòng đăng nhập');
    window.location.href = '/admin/categories';
}
async function addCategory(slug, name, thumbnail, status) {
    
    try {
        const res = await fetch(`/api/categories/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token.accessToken}`
            },
            body: JSON.stringify({ slug, name, thumbnail, status })
        });

        if (res.status === 403) {
            refreshToken()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                saveLocal(data);
                return addCategory(slug, name, thumbnail, status);
            });
        }

        return res;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}
let thumbnail = null
document.querySelector("#thumbnail").addEventListener("change", (event) => {
	const { files } = event.target;
    const reader = new FileReader();
	reader.readAsDataURL(files[0])
    thumbnail = '/images/categories/'+files[0].name;
    console.log(thumbnail);
	reader.addEventListener("load", (event) => {
		const img = event.target.result;
        document.querySelector('#thumbnail-preview').innerHTML = `                            <img id="" class="w-32 h-32 object-cover rounded-lg" src="${img}" alt="" />`
	})
})
let status = 'public';
document.querySelector('#status').addEventListener('change', (event) => {
    status = event.target.value;
}
)

document.querySelector('#add').addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const slug = name.toLowerCase().replace(/ /g, '-');
    const status = document.querySelector('#status').value;
    console.log(slug,name,thumbnail);
    const res = addCategory(slug,name,thumbnail,status);
    res.then(() => {
        console.log('add category success');
        uploadFile()
    })
    res.catch((error) => {
        console.log('add category fail', error);
    })
})
function uploadFile() {
    const fileInput = document.querySelector('#thumbnail');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file); // Thêm file vào FormData
    formData.append('name', 'avatar'); // Bạn cũng có thể thêm dữ liệu khác vào FormData như thế này

    fetch('/api/categories/images', {
        method: 'POST',
        body: formData // Sử dụng formData trực tiếp làm body
    })
    .then(response => response.text())
    .then(result => {
        console.log('File đã được upload thành công:', result);
    })
    .catch(error => {
        console.error('Có lỗi xảy ra:', error);
    });
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