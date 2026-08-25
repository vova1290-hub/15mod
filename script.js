const validate = new JustValidate('#film-form')

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

function renderFilms(films) {
    const filmTableBody = document.getElementById("film-tbody");
    filmTableBody.innerHTML = "";

    films.forEach((film) => {
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

async function renderTable() {
  const filmsResponse = await fetch("https://sb-film.skillbox.cc/films", {
    headers: {
      email: "ovikdevil@gmail.com",
    },
  });
  const films = await filmsResponse.json();

  renderFilms(films);
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

validate.addField('#title', [
    {
        rule: 'required',
        errorMessage: 'Введите название',
    },
]);

validate.addField('#genre', [
    {
        rule: 'required',
        errorMessage: 'Введите Жанр',
    },
]);

validate.addField('#releaseYear', [
    {
        rule: 'required',
        errorMessage: 'Введите Дату',
    },
    {
        rule: 'number',
        errorMessage: 'только числа',
    },
    {
        rule: 'maxNumber',
        value: 2027,
        errorMessage: 'Максимум 2027 год',
    },
    {
        rule: 'minNumber',
        value: 1950,
        errorMessage: 'минимум 1950 год',
    },
]);

validate.onSuccess(function() {
    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const releaseYear = document.querySelector('#releaseYear').value;
    const isWatched = document.querySelector('#isWatched').checked;

    const film = {
        title: title,
        genre: genre,
        releaseYear: releaseYear,
        isWatched: isWatched,
    };

    addFilm(film);

    document.querySelector('#film-form').reset();
})

async function filter() {
  console.log("filter запустилась");
  const titleFilter = document.getElementById("titleFilter").value;
  const genreFilter = document.getElementById("genreFilter").value;
  const yearFilter = document.getElementById("yearFilter").value;
  const watchedFilter = document.getElementById("watchedFilter").value;

  let url = "https://sb-film.skillbox.cc/films?";

  if (titleFilter) {
    url += `title=${titleFilter}&`;
  }

  if (genreFilter) {
    url += `genre=${genreFilter}&`;
  }

  if (yearFilter) {
    url += `releaseYear=${yearFilter}&`;
  }

  if (watchedFilter === "true" ) {
    url += `isWatched=true`;
  }

  if (watchedFilter === "false" ) {
    url += `isWatched=false`;
  }


  const filmsResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: "ovikdevil@gmail.com",
    },
  });

  const films = await filmsResponse.json();

  renderFilms(films);
}

document
  .getElementById("film-form")
  .addEventListener("submit", handleFormSubmit);

document
  .getElementById("titleFilter")
  .addEventListener("input", filter);

document
  .getElementById("genreFilter")
  .addEventListener("input", filter);

document
  .getElementById("yearFilter")
  .addEventListener("input", filter);

document
  .getElementById("watchedFilter")
  .addEventListener("change", filter);

renderTable();