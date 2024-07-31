document.addEventListener('DOMContentLoaded', async function () {
  function getMessagesByUser(userId) {
    return new Promise((resolve, reject) => {
      const callback = (responseStatus, responseData) => {
        if (responseStatus === 200) {
          const uMessages = responseData.filter((message) => message.user_id === userId).length;
          resolve(uMessages);
        } else {
          reject();
        }
      };

      fetchMethod(currentUrl + '/api/msg', callback);
    });
  }

  function getUserById(userId) {
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
  }

  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    const profileDiv = document.getElementById('profileDiv');

    if (responseStatus == 404) {
      userInfo.innerHTML = `${responseData.message}`;
      return;
    }

    profileDiv.innerHTML = `
      <div class="d-flex">
        <img src="../assets/img/profile_current.webp" alt="" class="rounded-circle" width="50" height="50" />
        <a href="profile.html?user_id=${userId}" class="text-decoration-none text-success">
          <h4 class="px-2">${name}</h4>
        </a>
      </div>
      <div class="pt-3">
        <h4 class="text">Total Points: ${totalPoints}</h4>
        <h4 class="text">Total Messages: ${totalMessages}</h4>
      </div>

    `;
  };

  const userId = await verify();
  if (userId != undefined) {
    var name = { ...(await getUserById(userId)) }.username;
    var totalPoints = { ...(await getUserById(userId)) }.points;
    var totalMessages = await getMessagesByUser(userId);

    const profileBtn = document.getElementById('profileButton');
    profileBtn.href = 'profile.html?user_id=' + userId;

    fetchMethod(currentUrl + '/api/user/' + userId, callback);
  } else {
    const messageList = document.getElementById('messageList');
    messageList.classList.remove('col-md-6');
    messageList.classList.add('col-md-12');
  }
});
