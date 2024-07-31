document.addEventListener('DOMContentLoaded', function () {
  const callback = (responseStatus, responseData) => {
    const color = ['red', 'yellow', 'green', 'blue'];
    const taskList = document.getElementById('taskList');

    responseData.forEach((task) => {
      const displayItem = document.createElement('article');
      const rand_color = color[Math.floor(Math.random() * color.length)];

      displayItem.classList = `task dark ${rand_color}`;

      displayItem.innerHTML = `
        <a class="task__img_link" href="#">
            <img class="task__img" src="assets/img/${task.task_id}.webp" alt="Image Title" />
        </a>
        <div class="task__text">
            <h1 class="task__title ${rand_color}"><a href="#">${task.title}</a></h1>
            <div class="task__subtitle">
              <span>${task.points}pts </span>
            </div>
            <div class="task__bar"></div>
            <div class="task__preview-txt">
              ${task.description}
            </div>
            <ul class="task__tagbox">
              <li class="tag__item ${rand_color}">
                <a href="#" onclick="completeTask(${task.task_id})">Complete</a>
              </li>
            </ul>
        </div>
      `;

      taskList.appendChild(displayItem);
    });
  };

  fetchMethod(currentUrl + '/api/task', callback);
});

// Complete task
async function completeTask(taskId) {
  const userId = await verify();

  const data = {
    user_id: userId,
    task_id: taskId,
    completion_date: new Date().toISOString().slice(0, 10),
  };
  console.log(data);

  const callback = (responseStatus, responseData) => {
    window.location.reload();
  };

  fetchMethod(currentUrl + '/api/taskP/', callback, 'POST', data);
}
