async function verify() {
  const token = localStorage.getItem('token');

  function getUserId(token) {
    return new Promise((resolve, reject) => {
      const callback = (responseStatus, responseData) => {
        if (responseStatus === 200) {
          resolve(responseData.userId);
        } else {
          reject();
        }
      };

      fetchMethod(currentUrl + '/api/jwt/verify', callback, 'GET', null, token);
    });
  }

  if (token != null) {
    return await getUserId(token);
  } else {
    return undefined;
  }
}
