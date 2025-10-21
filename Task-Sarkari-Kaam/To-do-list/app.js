document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const timeValue = document.getElementById("timeValue");
  const timeType = document.getElementById("timeType");
  const taskList = document.getElementById("taskList");
  const activeList = document.getElementById("tasklist");
  const forgottenList = document.getElementById("forgottenList");

  function convertToSeconds(value, type) {
    if (type === "minutes") return value * 60;
    if (type === "hours") return value * 3600;
    if (type === "days") return value * 86400;
    return value;
  }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskName = taskInput.value.trim();
    const value = parseInt(timeValue.value);
    const type = timeType.value;

    if (!taskName || !value) {
      alert("Please enter both task and time!");
      return;
    }

    const totalSeconds = convertToSeconds(value, type);
    createTask(taskName, totalSeconds);

    taskInput.value = "";
    timeValue.value = "";
  });

  function createTask(name, seconds) {
    const li = document.createElement("li");
    li.textContent = `${name} - Time left: ${seconds}s `;

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.className = "start";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Mark Complete";
    completeBtn.className = "complete";

    li.appendChild(startBtn);
    li.appendChild(completeBtn);
    taskList.appendChild(li);

    let interval; 

    startBtn.addEventListener("click", function () {
      if (interval) return; 

      interval = setInterval(() => {
        seconds--;
        li.textContent = `${name} - Time left: ${seconds}s `;
        li.appendChild(startBtn);
        li.appendChild(completeBtn);

        if (seconds <= 0) {
          clearInterval(interval);
          li.textContent = `${name} - Time's up!`;
          li.classList.add("expired");
          forgottenList.appendChild(li);
        }
      }, 1000);
    });

    completeBtn.addEventListener("click", function () {
      clearInterval(interval);
      li.textContent = `${name} - Completed `;
      li.classList.add("completed");
      completedList.appendChild(li);
    });
  }
});
