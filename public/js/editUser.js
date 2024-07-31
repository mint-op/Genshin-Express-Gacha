function editUser(userId) {
  divToggle('editUser');

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

  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    if (responseStatus == 204) {
      window.location.reload();
    }
  };

  const form = document.getElementById('editUserForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const currentPassword = document.getElementById('currentPassword').value;

    const warningCard = document.getElementById('warningCard1');
    const warningText = document.getElementById('warningText1');

    if (username == '' && email == '' && currentPassword == '') {
      warningCard.classList.remove('d-none');
      warningText.innerText = 'Input fields cannot be empty';
      return;
    } else if (username == '') {
      warningCard.classList.remove('d-none');
      warningText.innerText = 'Please enter a username';
      return;
    } else if (email == '') {
      warningCard.classList.remove('d-none');
      warningText.innerText = 'Please enter an email';
      return;
    } else if (currentPassword == '') {
      warningCard.classList.remove('d-none');
      warningText.innerText = 'Please enter your current password';
      return;
    }

    const userDetails = await getUserDetails(userId);
    comparePassword({
      hash: userDetails.password,
      password: currentPassword,
    })
      .then(() => {
        const data = {
          username: username,
          email: email,
          password: userDetails.password,
        };

        fetchMethod(currentUrl + '/api/user/', callback, 'PUT', data, localStorage.getItem('token'));
      })
      .catch((error) => {
        warningCard.classList.remove('d-none');
        warningText.innerText = error.message;
      });
  });
}
