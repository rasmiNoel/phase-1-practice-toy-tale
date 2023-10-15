let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((toy) => {
      renderToys(toy);
    });
  });

function renderToys(toy) {
  const toyCollection = document.getElementById("toy-collection");
  const card = document.createElement("div");
  card.classList.add("card");
  const h2 = document.createElement("h2");
  h2.innerText = toy.name;
  const img = document.createElement("img");
  img.src = toy.image;
  img.classList.add("toy-avatar");
  const p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`;
  const btn = document.createElement("button");
  btn.classList.add("like-btn");
  btn.innerText = "Like <3";
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    increaseLikes(toy, p);
  });
  card.append(h2, img, p, btn);
  toyCollection.appendChild(card);
}

function increaseLikes(toy, p) {
  toy.likes++;
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: toy.likes,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      p.innerText = `${data.likes} Likes`;
    });
}

const form = document.querySelector(".add-toy-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const image = e.target.image.value;
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: 0,
      name,
      image,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      renderToys(data);
    });
});
