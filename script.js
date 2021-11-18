// Scroll To Top
const btn = document.querySelector("#scroll-to-top");

btn.onclick = () => {
  this.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

window.onscroll = () => {
  if (window.scrollY >= 50) {
    btn.classList.add("not-active");
  } else btn.classList.remove("not-active");
};

("use strict");

const baseURL = "https://yts.mx/api/v2/list_movies.json";

let movies = fetch(baseURL)
  .then((resp) => resp.json())
  .then((database) => database.data.movies);

console.log(movies);
movies.then((movies) =>
  movies.forEach((movie) => {
    let movieContainer = (document.createElement(
      "div"
    ).innerHTML = `<div class="card-top">
    <div class="card">
      <img
        src="${movie.medium_cover_image}"
      "
        alt="image"
      />
      <div class="txt">
        <i class="fas fa-star star"></i>
        <p class="rating-wrap">
          <span class="rate">${movie.rating}</span>
          / 10
        </p>
        <div class="genres">
        ${
          movie.genres.length > 1
            ? `<p>${movie.genres[0]}</p> 
             <p>${movie.genres[1]}</p>`
            : `<p>${movie.genres[0]}</p>`
        }
  
        </div>
        <a href="${movie.torrents[0].url}" class="download">Download</a>
      </div>
    </div>
    <div class="info">
      <div class="footer">
        <p class="title">${movie.title}</p>
        <p class="year">${movie.year}</p>
      </div>
    </div>
  </div>
    `);

    document
      .querySelector(".cards")
      .insertAdjacentHTML("beforeend", movieContainer);
  })
);
