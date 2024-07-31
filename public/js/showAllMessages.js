// For image: insert `<img src="https://picsum.photos/600/300" alt="" class="rounded img-fluid" />`
// in line 22

document.addEventListener('DOMContentLoaded', async function () {
  const userId = await verify();
  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    const sorted = responseData.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    const userList = document.getElementById('messageList');
    sorted.forEach((user) => {
      const msgType = userId == user.user_id ? 'darker' : 'comment';

      const displayItem = document.createElement('div');
      displayItem.className = `${msgType} mt-4 text-justify`;
      displayItem.innerHTML = `
        <img src="../assets/img/profile.webp" alt="" class="rounded-circle" width="40" height="40" />
        <a href="profile.html?user_id=${user.user_id}" class="text-decoration-none text-success px-2">
          <h4>${user.username}</h4>
        </a>
        <span>- ${user.created_at}</span>
        <br />
        <br />
        <p>
          ${user.message_text}
        </p>
      `;
      userList.appendChild(displayItem);
    });
  };

  fetchMethod(currentUrl + '/api/msg', callback);
});
