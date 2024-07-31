function editPassword(userId) {
  divToggle('editPasswd');

  // REQUIREMENTS: userId
  const getUserDetails = (userId) => {
    return new Promise((resolve, reject) => {
      const callback = (responseStatus, responseData) => {
        if (responseStatus == 200) {
          resolve(responseData);
        } else {
          reject();
        }
      };

      fetchMethod(currentUrl + `/api/user/${userId}`, callback);
    });
  };

  // REQUIREMENTS: hash password, user password
  const comparePassword = (data) => {
    return new Promise((resolve, reject) => {
      const callback = (responseStatus, responseData) => {
        if (responseStatus == 200) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      };

      fetchMethod(currentUrl + `/api/bcrypt/compare`, callback, 'POST', data);
    });
  };

  // REQUIREMENTS: user password
  const hashPassword = (data) => {
    return new Promise((resolve, reject) => {
      const callback = (responseStatus, responseData) => {
        if (responseStatus == 200) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      };

      fetchMethod(currentUrl + `/api/bcrypt/hash`, callback, 'POST', data);
    });
  };

  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    if (responseStatus == 204) {
      window.location.reload();
    }
  };

  const form = document.getElementById('editUserPasswdForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const oldPasswd = document.getElementById('password-old').value;
    const newPasswd = document.getElementById('password-new').value;

    const warningCard = document.getElementById('warningCard2');
    const warningText = document.getElementById('warningText2');

    if (oldPasswd == '' && newPasswd == '') {
      warningCard.classList.remove('d-none');
      warningText.innerText = 'Input fields cannot be empty';
      return;
    } else if (oldPasswd == '') {
      warningCard.classList.remove('d-none');
      warningText.innerText = 'Please enter your current password';
      return;
    } else if (newPasswd == '') {
      warningCard.classList.remove('d-none');
      warningText.innerText = 'Please enter a new password';
      return;
    }

    const userDetails = await getUserDetails(userId);
    comparePassword({
      hash: userDetails.password,
      password: oldPasswd,
    })
      .then(() => {
        hashPassword({
          password: newPasswd,
        })
          .then((hash) => {
            const data = {
              username: userDetails.username,
              email: userDetails.email,
              password: hash.hash,
            };

            fetchMethod(currentUrl + '/api/user/', callback, 'PUT', data, localStorage.getItem('token'));
          })
          .catch((error) => {
            warningCard.classList.remove('d-none');
            warningText.innerText = error.message;
          });
      })
      .catch((error) => {
        warningCard.classList.remove('d-none');
        warningText.innerText = error.message;
      });
  });
}
