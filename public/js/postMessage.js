document.addEventListener('DOMContentLoaded', function () {
  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);
    if (responseStatus == 201) {
      if (responseData.token) {
        window.location.href = 'index.html';
      }
    }
  };

  const createMsgForm = document.getElementById('createMsgForm');

  createMsgForm.addEventListener('submit', function (event) {
    // console.log('createMsgForm.addEventListener');
    event.preventDefault();

    const token = localStorage.getItem('token');
    const messageBox = document.getElementById('messageBox').value;

    const data = {
      message_text: messageBox,
    };

    fetchMethod(currentUrl + '/api/msg', callback, 'POST', data, token);

    createMsgForm.reset();

    window.location.reload();
  });
});
