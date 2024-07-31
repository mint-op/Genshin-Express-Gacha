document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  const warningCard = document.getElementById('warningCard');
  const warningText = document.getElementById('warningText');

  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword) {
      // console.log('Signup successful');
      // console.log('username:', username);
      // console.log('email:', email);
      // console.log('password:', password);
      warningCard.classList.add('d-none');

      const data = {
        username: username,
        email: email,
        password: password,
      };

      const callback = (responseStatus, responseData) => {
        // console.log('responseStatus:', responseStatus);
        // console.log('responseData:', responseData);

        if (responseStatus == 200) {
          if (responseData.token) {
            localStorage.setItem('token', responseData.token);
            const callback2 = (responseStatus, responseData) => {
              if (responseStatus != 200) {
                warningCard.classList.remove('d-none');
                warningText.innerText = responseData.message;
              }
            };
            fetchMethod(currentUrl + '/api/game', callback2, 'POST', { name: data.username }, responseData.token);
            window.location.href = 'index.html';
          }
        } else {
          warningCard.classList.remove('d-none');
          warningText.innerText = responseData.message;
        }
      };

      fetchMethod(currentUrl + '/api/register', callback, 'POST', data);

      signupForm.reset();
    } else {
      warningCard.classList.remove('d-none');
      warningCard.innerText = 'Passwords do not match';
    }
  });
});
