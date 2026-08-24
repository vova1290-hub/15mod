function handleFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const releaseYear = document.getElementById("releaseYear").value;
  const isWatched = document.getElementById("isWatched").checked;

  const film = {
    title: title,
    genre: genre,
    releaseYear: releaseYear,
    isWatched: isWatched,
  };

  addFilm(film);
}

async function addFilm(film) {
  await fetch("https://sb-film.skillbox.cc/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: "ovikdevil@gmail.com",
    },
    body: JSON.stringify(film),
  });
  renderTable();
}

async function renderTable() {
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });
  const films = await filmsResponse.json();

  const filmTableBody = document.getElementById("film-tbody");

  filmTableBody.innerHTML = "";

  films.forEach((film, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.genre}</td>
      <td>${film.releaseYear}</td>
      <td>${film.isWatched ? "Да" : "Нет"}</td>
      <td>
        <button onclick="deleteFilm(${film.id})">Удалить</button>
      </td>
    `;
    filmTableBody.appendChild(row);
  });
}

async function deleteFilm(id) {
    const response = await fetch(`https://sb-film.skillbox.cc/films/${id}`, {
        method: "DELETE",
        headers: {
            email: "ovikdevil@gmail.com"
        }
    })

    renderTable()
}

async function deleteAllFilm() {
    const response = await fetch("https://sb-film.skillbox.cc/films", {
        method: "DELETE",
        headers: {
            email: "ovikdevil@gmail.com"
        }
    })

    renderTable()
}

document
  .getElementById("film-form")
  .addEventListener("submit", handleFormSubmit);

renderTable();