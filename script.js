
// Mengambil elemen dari DOM
const inputTask = document.querySelector("#input-task");
const inputCategory = document.querySelector("#input-category");
const inputDate = document.querySelector("#input-date");
const btnSubmit = document.querySelector(".btn-submit");
const btnClear = document.querySelector(".btn-clear");
const parentList = document.querySelector(".list");

// Menambahkan event listener
btnSubmit.addEventListener("click", addTask);
btnClear.addEventListener("click", clearTask);
parentList.addEventListener("click", deleteTask);

// Menampilkan task yang tersimpan di localStorage
showTasks();

// Fungsi untuk memperbarui localStorage
function updateStorage() {
  localStorage.setItem("tasks", parentList.innerHTML);
}

// Fungsi untuk menampilkan task dari localStorage
function showTasks() {
  parentList.innerHTML = localStorage.getItem("tasks") || "";
}

// Fungsi untuk menambahkan task baru
function addTask(e) {
  e.preventDefault();
  
  if (inputTask.value === "") {
    alert("Masukkan task terlebih dahulu");
    return;
  }
  
  if (inputCategory.value === "") {
    alert("Masukkan kategori terlebih dahulu");
    return;
  }
  
  if (inputDate.value === "") {
    alert("Masukkan tanggal terlebih dahulu");
    return;
  }

  const newTask = document.createElement("li");
  newTask.classList.add("list-item");
  newTask.innerHTML = `
    <div class="task-left">
      <p class="task-title">${inputTask.value}</p>
      <div class="badge">
        <p class="date">${inputDate.value}</p>
        <p class="category">${inputCategory.value}</p>
      </div>
    </div>
    <div class="task-right">
      <button class="btn-delete">Delete</button>
      <button class="btn-edit">Edit</button>
    </div>`;

  inputTask.value = "";
  inputCategory.value = "";
  inputDate.value = "";

  parentList.insertBefore(newTask, parentList.firstChild);
  updateStorage();

  const message = document.querySelector(".message");
  if (message) message.remove();
}

// Fungsi untuk menghapus task
function deleteTask(e) {
  if (e.target.classList.contains("btn-delete")) {
    e.target.closest("li").remove();
    
    if (!parentList.firstChild) {
      displayEmptyMessage();
    }
    
    updateStorage();
  } else if (e.target.classList.contains("task-title")) {
    e.target.style.textDecoration = "line-through";
    updateStorage();
  }
}

// Fungsi untuk menghapus semua task
function clearTask() {
  parentList.innerHTML = "";
  displayEmptyMessage();
  updateStorage();
}

// Fungsi untuk menampilkan pesan jika tidak ada task
function displayEmptyMessage() {
  const message = document.createElement("div");
  message.classList.add("message");

  const h1 = document.createElement("h1");
  h1.textContent = "Masukkan Task Dahulu";
  message.appendChild(h1);

  parentList.appendChild(message);
}
