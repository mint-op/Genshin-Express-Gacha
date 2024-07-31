document.addEventListener('DOMContentLoaded', async function () {
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const userId = urlParams.get('user_id');

  const callbackForUserInfo = (responoseStatus, responseData) => {
    // console.log('responseStatus', responoseStatus);
    // console.log('responseData', responseData);

    const userInfo = document.getElementById('userInfo');

    if (responoseStatus == 404) {
      userInfo.innerHTML = `${responseData.message}`;
      return;
    }

    var edit_button = ``;

    if (current_userId == userId) {
      edit_button = `
        <!-- Edit Button -->
        <div class="position-absolute top-0 end-0 p-2">
          <div class="dropdown position-absolute top-0 end-0 p-2">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
                >
                <path
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                />
              </svg>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" id="editButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 20">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                    Edit
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" id="changePasswordButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 20">
                      <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                      <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415"/>
                    </svg>
                    Change Password
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" id="deleteAccountButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 20">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                    Delete Account
                  </a>
                </li>
              </ul>
          </div>
        </div>
      `;
    }

    userInfo.innerHTML = `
        <div class="card">
            ${edit_button}
            <div class="card-body">
                <p class="card-text">
                    Username: ${responseData.username} <br />
                    Email: ${responseData.email} <br />
                    points: ${responseData.points} <br />
                    Created On: ${responseData.created_on} <br />
                    Updated On: ${responseData.updated_on} <br />
                </p>
            </div>
        </div>
    `;

    const editButton = document.getElementById('editButton');
    const changePasswordButton = document.getElementById('changePasswordButton');
    const deleteButton = document.getElementById('deleteAccountButton');

    editButton.addEventListener('click', function () {
      editUser(current_userId);
    });

    changePasswordButton.addEventListener('click', function () {
      editPassword(current_userId);
    });

    deleteButton.addEventListener('click', function () {
      deleteAccount();
    });
  };

  var current_userId = await verify();

  fetchMethod(currentUrl + `/api/user/${userId}`, callbackForUserInfo);
});
