function logout() {
  let id = JSON.parse(localStorage.getItem('user')).id;
  fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 200) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/auth/dang-nhap';
    } else {
      alert('Đã xảy ra lỗi khi đăng xuất');
    }
  })
  .catch(err => {
    alert('Đã xảy ra lỗi khi đăng xuất'+err);
  });
}


logout();