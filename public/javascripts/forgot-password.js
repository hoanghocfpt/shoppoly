document.querySelector('#searchAccount').addEventListener('click', (e) => {
  e.preventDefault();
  searchAccount();
  return false;
});

function searchAccount() {
    let email = document.querySelector('#email').value;
    fetch(`http://localhost:3000/api/forgot-password/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message == 'Email not found') {
            const toast = Toast('Không tìm thấy tài khoản', 'danger');
            // document.querySelector('body').innerHTML += toast
            // setTimeout(() => {
            // document.querySelector('#toast-danger').remove();
            // }, 2000);
            return false;
        } else {
            // Update UI
            document.querySelector('#otpDiv').classList.remove('hidden');
            document.querySelector('#email').setAttribute('value', data.email);
            document.querySelector('#email').setAttribute('readonly', 'true');
            document.querySelector('#email').classList.add('bg-gray-100');
            document.querySelector('#verifyOtp').classList.remove('hidden');
            document.querySelector('#searchAccount').classList.add('hidden');
            // console.log(data.email);
            // const toast = Toast('Kiểm tra email để lấy mã OTP', 'success');
            // document.querySelector('body').innerHTML += toast
            // setTimeout(() => {
            // document.querySelector('#toast-success').remove();
            // }, 2000);
            return true;
        }
    })
}


document.querySelector('#verifyOtp').addEventListener('click', (e) => {
    e.preventDefault();
    verifyOtp();
    return false;
});

function verifyOtp() {
    let email = document.querySelector('#email').value;
    let otp = document.querySelector('#otp').value;

    fetch(`http://localhost:3000/api/verify-otp/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            otp: otp
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 401 || data.status === 403) {
            // const toast = Toast('Mã OTP không đúng', 'danger');
            // document.querySelector('body').innerHTML += toast
            // setTimeout(() => {
            // document.querySelector('#toast-danger').remove();
            // }, 2000);
            console.log('Mã OTP không đúng hoặc đã hết hạn');
            alert('Mã OTP không đúng hoặc đã hết hạn')
            return false
        } else {
            // Update UI
            document.querySelector('#newPasswordDiv').classList.remove('hidden');
            document.querySelector('#otpDiv').classList.add('hidden')
            document.querySelector('#verifyOtp').classList.add('hidden');
            document.querySelector('#resetPassword').classList.remove('hidden')
            // const toast = Toast('Đổi mật khẩu thành công', 'success');
            // document.querySelector('body').innerHTML += toast
            // setTimeout(() => {
            // document.querySelector('#toast-success').remove();
            // }, 2000);
            console.log('Tiếp tục');
      
        }
    })
}


document.querySelector('#resetPassword').addEventListener('click', (e) => {
    e.preventDefault();
    resetPassword();    
});

function resetPassword () {
    let newPassword = document.querySelector('#newPassword').value;
    let email = document.querySelector('#email').value
    fetch(`http://localhost:3000/api/reset-password/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            newPassword: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 500) {
            // const toast = Toast('Mã OTP không đúng', 'danger');
            // document.querySelector('body').innerHTML += toast
            // setTimeout(() => {
            // document.querySelector('#toast-danger').remove();
            // }, 2000);
            console.log('Lỗi');
        } else {
            // const toast = Toast('Đổi mật khẩu thành công', 'success');
            // document.querySelector('body').innerHTML += toast
            // setTimeout(() => {
            // document.querySelector('#toast-success').remove();
            // }, 2000);
            console.log('Đổi mật khẩu thành công');
      
        }
    })
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
        
        