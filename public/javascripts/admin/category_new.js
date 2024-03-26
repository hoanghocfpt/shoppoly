async function addCategory(slug, name, thumbnail, status) {
    try {
        const res = await fetch(`/api/categories/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ slug, name, thumbnail, status })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
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