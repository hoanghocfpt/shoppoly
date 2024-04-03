async function getUserData() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token.accessToken);
    const headers = {
      'authorization': `Bearer ${token.accessToken}`
    }
    const data = await fetch(`/api/users/${id}`,{headers})
  
    
    if(data.status === 401){
      window.location.href = '/auth/dang-xuat';
    }
    if(data.status === 403){
      // neu het han
      refreshToken()
      .then(dataToken => dataToken.json())
      .then(dataToken => {
        saveLocal(dataToken);
      })
    }
    return data;
  }