let ul = document.querySelector("ul");
let form = document.querySelector("form");
let input = document.querySelector("input");
let btns = document.getElementsByClassName("delete-btn");

document.addEventListener("DOMContentLoaded", function () {
  ShowUsers();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  fetch("http://localhost:5600/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.value,
    }),
  })
    .then(ShowUsers)
    .catch((error) => {
      alert(error.content);
    });
});

async function ShowUsers() {
  await fetch("http://localhost:5600/users")
    .then((res) => res.json())
    .then((users = []) => {
      ul.innerHTML = "";

      users.forEach((user) => {
        ul.innerHTML += `<li>${user.name} <button class='delete-btn' data-id='${user._id}'>Sil</button> </li>`;
      });
    })
    .catch((error) => alert(error.message));

  for (const btn of btns) {
    btn.addEventListener("click", function (e) {
      let id = e.currentTarget.dataset.id;
      DeleteProduct(id);
    });
  }
}

function DeleteProduct(id) {
  fetch("http://localhost:5600/users/" + id, {
    method: "DELETE",
  })
    .then(ShowUsers)
    .catch((error) => alert(error.message));
}
