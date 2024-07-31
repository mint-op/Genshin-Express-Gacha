/** For image
 *  <div class="card-img">
 *      <img src="https://picsum.photos/300/200" alt="" class="img-fluid" />
 *  </div>
 * in line 56
 */

document.addEventListener('DOMContentLoaded', async function () {
  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    var footer = ``;

    const messageList = document.getElementById('messageList');
    const messages = responseData
      .filter((f) => f.user_id == userId)
      .sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

    messages.forEach((msg) => {
      if (current_userId == userId) {
        footer = `
                  <div class="card-footer"> 
                      <a href="#" class="btn btn-primary info" id="edit-${msg.id}">Update</a>
                      <a href="#" class="btn btn-danger info" id="delete-${msg.id}">Delete</a>
                  </div>
                `;
      }

      const displayItem = document.createElement('div');
      displayItem.className = 'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3';
      displayItem.innerHTML = `
            <div class="card border-primary">
                <div class="card-header">Message ID: ${msg.id}</div>
                <div class="card-body">
                    <p class="card-text">${msg.message_text}</p>
                </div>
                ${footer}
            </div>
          `;
      messageList.appendChild(displayItem);
    });
  };

  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const userId = urlParams.get('user_id');

  var current_userId = await verify();

  await fetchMethod(currentUrl + '/api/msg', callback);
});
