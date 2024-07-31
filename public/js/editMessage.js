document.addEventListener('click', function (event) {
  var pattern = /^edit-(\d+)$/;
  if (event.target.id && pattern.test(event.target.id)) {
    divToggle('editMessage');
    match = event.target.id.match(pattern);
  }
});

document.addEventListener('click', function (event) {
  var pattern = /^delete-(\d+)$/;
  if (event.target.id && pattern.test(event.target.id)) {
    const match = event.target.id.match(pattern);

    const callback = (responseStatus, responseData) => {
      // console.log('responseStatus:', responseStatus);
      // console.log('responseData:', responseData);

      if (responseStatus === 204) {
        window.location.reload();
      }
    };

    fetchMethod(currentUrl + '/api/msg/' + match[1], callback, 'DELETE', null, null);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    const warningCard = document.getElementById('warningCard3');
    const warningText = document.getElementById('warningText3');

    if (responseStatus === 200) {
      window.location.reload();
    } else {
      warningCard.classList.remove('d-none');
      warningText.innerText = 'Please enter the message';
    }
  };

  const editMessageForm = document.getElementById('editMessageForm');

  editMessageForm.addEventListener('reset', function () {
    divToggle('default');
  });

  editMessageForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const message = document.getElementById('editMessageBox').value;

    const userId = await verify();
    const data = {
      user_id: userId,
      message_text: message,
    };

    fetchMethod(currentUrl + '/api/msg/' + match[1], callback, 'PUT', data, null);
  });
});
