function deleteAccount() {
  const callback = (responseStatus, responseData) => {
    if (responseStatus == 204) {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    }
  };

  fetchMethod(currentUrl + `/api/user/`, callback, 'DELETE', null, localStorage.getItem('token'));
}
