function divToggle(mode) {
  const showUserInfo = document.getElementById('showUserInfo');
  const editUserInfo = document.getElementById('editUserInfo');
  const editUserPasswd = document.getElementById('editUserPasswd');
  const editMessage = document.getElementById('editMessage');

  if (mode === 'editUser') {
    showUserInfo.classList.add('d-none');
    editUserInfo.classList.remove('d-none');
  } else if (mode === 'editPasswd') {
    showUserInfo.classList.add('d-none');
    editUserPasswd.classList.remove('d-none');
  } else if (mode === 'editMessage') {
    showUserInfo.classList.add('d-none');
    editMessage.classList.remove('d-none');
  } else if (mode === 'default') {
    showUserInfo.classList.remove('d-none');
    editUserInfo.classList.add('d-none');
    editUserPasswd.classList.add('d-none');
    editMessage.classList.add('d-none');
  }
}
