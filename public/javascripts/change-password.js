if(!localStorage.getItem('token') || localStorage.getItem('token') === null){
    window.location.href = '/auth/dang-nhap';
  }
const id = JSON.parse(localStorage.getItem('user')).id;
console.log(id);
async function getUserData() {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
        'authorization': `Bearer ${token.accessToken}`
    }
    const data = await fetch(`/api/users/${id}`,{headers})
  
    if(data.status === 401 || data.status === 403){
        window.location.href = '/auth/dang-xuat';
    }
    reunderUserInfo(await data.json())
}
  
getUserData();
  
function reunderUserInfo(data){
    console.log(data);
    document.querySelector('#phonePoint').innerHTML = data.phone;
    document.querySelector('#point').innerHTML = data.points + ' điểm';
    let rank = 'bronze';
    let color = `from-[#EEC88B] to-[#503B2B]`.split(' ');
    if (data.points >= 300) {
      rank = 'diamond';
      color = `from-[#b9f2ff] to-[#00acc1]`.split(' ');
    } else if (data.points >= 200) {
      rank = 'gold';
      color = `from-[#FFD700] to-[#B8860B]`.split(' ');
    } else if (data.points >= 100) {
      rank = 'silver';
      color = `from-[#C0C0C0] to-[#757575]`.split(' ');
    }
  
    let element = document.querySelector('#rankColor');
    color.forEach(c => element.classList.add(c));
    document.querySelector('#rankName').innerHTML = rank;
    document.querySelector('#fullname').innerHTML = data.firstName + ' ' + data.lastName;
  }
  
  // Khi người dùng click cập nhật
  document.querySelector('#update').addEventListener('click', (e) => {
    e.preventDefault();
    updateUserPassword();
  });
  
function updateUserPassword() {
    let oldPassword = document.querySelector('#oldPassword').value;
    let newPassword = document.querySelector('#newPassword').value;
    let confirmPassword = document.querySelector('#confirmPassword').value;
    if (newPassword !== confirmPassword) {
        const toast = Toast('Mật khẩu mới không khớp', 'danger');
        document.querySelector('body').innerHTML += toast
        setTimeout(() => {
            document.querySelector('#toast-danger').remove();
            window.location.href = '/khach-hang/doi-mat-khau';
        }, 2000);
        return false;
    }
    let user = JSON.parse(localStorage.getItem('user'));
    let token = JSON.parse(localStorage.getItem('token'));
    const update = updatePassword(oldPassword, newPassword, user.id, token)
    update.then(data => {
        if (data.message === 'Mật khẩu cũ không đúng' || data.satus === 401) {
            const toast = Toast('Mật khẩu cũ không đúng', 'danger');
            document.querySelector('body').innerHTML += toast
            setTimeout(() => {
                document.querySelector('#toast-danger').remove();
                window.location.href = '/khach-hang/doi-mat-khau';
            }, 2000);
        } else if(data.error){
            const toast = Toast(data.error, 'danger');
            document.querySelector('body').innerHTML += toast
            setTimeout(() => {
                document.querySelector('#toast-danger').remove();
                window.location.href = '/khach-hang/doi-mat-khau';
            }, 2000);
        }else{
            const toast = Toast('Cập nhật mật khẩu thành công', 'success');
            document.querySelector('body').innerHTML += toast
            setTimeout(() => {
                document.querySelector('#toast-success').remove();
                window.location.href = '/khach-hang/doi-mat-khau';
            }, 2000);
        }
    })
}
  
  
async function updatePassword(oldPassword, newPassword, id, token) {
    const data = await fetch(`http://localhost:3000/api/users/change-password/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token.accessToken}`
        },
        body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
    })
    return await data.json();
}
  
  
  
  
const Toast = (message, type) => {
let html = ''
switch (type) {
    case 'success':
        html= `<div id="toast-success" class="flex items-center fixed z-50 right-4 top-4 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">${message}</div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>`
        break;
    case 'danger':
        html= `<div id="toast-danger" class="flex items-center fixed z-50 right-4 top-4 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
            <span class="sr-only">Error icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">${message}</div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>`
        break;
    case 'warning':
        html= `<div id="toast-warning" class="flex items-center fixed z-50 right-4 top-4 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
            <span class="sr-only">Warning icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">${message}</div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>`
        break;
    default:
        html= `<div id="toast-success" class="flex items-center fixed z-50 right-4 top-4 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">${message}</div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>`
}
return html;
}

