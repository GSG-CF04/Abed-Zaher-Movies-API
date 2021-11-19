"use strict";
//use strict must be in the first line to work

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

//API Database link
const baseURL = "https://yts.mx/api/v2/list_movies.json?limit=50";

//Add image if no image available
function addDefaultImage() {
  document.querySelectorAll(".card img").forEach((img) => {
    img.onerror = function () {
      this.src = "./assets/images/default-photo.jpg";
    };
  });
}

//Fetching movies from API
let movies = fetch(baseURL)
  .then((resp) => resp.json())
  .then((database) => database.data.movies);

let card = document.querySelector(".cards");

//Display movies onload
console.log(movies);
movies.then((movies) =>
  movies.forEach((movie) => {
    displayMovies(movie);
    addDefaultImage();
  })
);

const search = document.querySelector("#search-field");
const searchURL = "https://yts.mx/api/v2/list_movies.json?limit=50&query_term=";

//Search for movies
search.addEventListener("input", (e) => {
  let searchTerm = e.target.value.trim();
  fetch(`${searchURL}${searchTerm}`)
    .then((resp) => resp.json())
    .then((database) => {
      let movies = database.data.movies;
      console.log(movies);
      document.querySelector(".cards").innerHTML = "";
      movies.forEach((movie) => {
        displayMovies(movie);
        addDefaultImage();
      });
    });
});

//Display Movies
function displayMovies(movie) {
  let movieContainer = document.createElement("div");
  movieContainer.classList.add("card-top");
  card.appendChild(movieContainer);

  let movieCard = document.createElement("div");
  movieCard.classList.add("card");
  movieContainer.appendChild(movieCard);

  let movieImage = document.createElement("img");
  movieImage.src = movie.medium_cover_image;
  movieCard.appendChild(movieImage);

  let movieText = document.createElement("div");
  movieText.classList.add("txt");
  movieCard.appendChild(movieText);

  let star = document.createElement("i");
  star.classList.add("fas", "fa-star", "star");
  movieText.appendChild(star);

  let ratingWrap = document.createElement("p");
  ratingWrap.classList.add("rating-wrap");
  movieText.appendChild(ratingWrap);

  let rate = document.createElement("span");
  rate.classList.add("rate");
  rate.textContent = movie.rating + " / 10";
  ratingWrap.appendChild(rate);

  let genres = document.createElement("div");
  genres.classList.add("genres");
  if (movie.genres.length > 1) {
    genres.setAttribute("style", "white-space: pre;");
    genres.textContent = `${movie.genres[0]} \n ${movie.genres[1]}`;
  } else {
    genres.textContent = movie.genres[0];
  }

  movieText.appendChild(genres);

  let downloadLink = document.createElement("a");
  downloadLink.classList.add("download");
  downloadLink.href = movie.torrents[0].url;
  downloadLink.textContent = "Download";
  movieText.appendChild(downloadLink);

  let youtubeLink = document.createElement("a");
  youtubeLink.classList.add("trailer");
  youtubeLink.href = `https://www.youtube.com/watch?v=${movie.yt_trailer_code}`;
  youtubeLink.target = "_blank";
  youtubeLink.textContent = "Watch Trailer";
  movieText.appendChild(youtubeLink);

  let youtubeIcon = document.createElement("i");
  youtubeIcon.classList.add("fab", "fa-youtube");
  youtubeLink.appendChild(youtubeIcon);

  let cardInfo = document.createElement("div");
  cardInfo.classList.add("info");
  movieContainer.appendChild(cardInfo);

  let cardFooter = document.createElement("div");
  cardFooter.classList.add("footer");
  cardInfo.appendChild(cardFooter);

  let movieTitle = document.createElement("a");
  movieTitle.classList.add("title");
  movieTitle.href = `https://www.imdb.com/title/${movie.imdb_code}`;
  movieTitle.target = "_blank";
  cardInfo.appendChild(movieTitle);
  movieTitle.style.color = "white";
  movieTitle.textContent = movie["title_english"];

  let movieYear = document.createElement("p");
  movieYear.classList.add("year");
  movieYear.style.color = "white";
  movieYear.textContent = movie.year;
  cardInfo.appendChild(movieYear);

  document.querySelector(".cards").append(movieContainer);
}
