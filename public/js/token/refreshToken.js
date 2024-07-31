// Refresh Token every 14 minutes
const token = localStorage.getItem('token');

function getUserId() {
  return new Promise((resolve, reject) => {
    const callback = (responseStatus, responseData) => {
      if (responseStatus === 200) {
        resolve(responseData.userId);
      } else {
        reject();
      }
    };

    const token = localStorage.getItem('token');

    fetchMethod(currentUrl + '/api/jwt/verify', callback, 'GET', null, token);
  });
}

(async () => {
  if (token) {
    // if token exists, refresh it
    const callback = (responseStatus, responseData) => {
      if (responseStatus === 200) {
        localStorage.setItem('token', responseData.token);
      }
    };

    const userId = await getUserId();
    const data = {
      id: userId,
    };

    fetchMethod(currentUrl + '/api/jwt/generate', callback, 'POST', data);
    setInterval(() => {
      fetchMethod(currentUrl + '/api/jwt/generate', callback, 'POST', data);
      console.log('Refreshing token...');
    }, 840000);
  }
})();
