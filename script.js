"use strict";
// use strict must be in the first line to work

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
movies.then((movies) =>
  movies.forEach((movie) => {
    displayMovies(movie);
    addDefaultImage();
  })
);

const form = document.forms[0];
const search = document.querySelector("#search-field");
const searchURL = "https://yts.mx/api/v2/list_movies.json?limit=50&query_term=";

// Prevent auto refresh when submitting the form
form.onsubmit = (e) => e.preventDefault();

// Search for movies
search.addEventListener("input", (e) => {
  let searchTerm = e.target.value.trim();
  fetch(`${searchURL}${searchTerm}`)
    .then((resp) => resp.json())
    .then((database) => {
      let movies = database.data.movies;
      document.querySelector(".cards").innerHTML = "";
      movies.forEach((movie) => {
        displayMovies(movie);
        addDefaultImage();
      });
    });
});

// Display Movies
function displayMovies(movie) {
  let movieContainer = document.createElement("div");
  movieContainer.classList.add("card-top");
  card.append(movieContainer);

  let movieCard = document.createElement("div");
  movieCard.classList.add("card");
  movieContainer.append(movieCard);

  let movieImage = document.createElement("img");
  movieImage.src = movie.medium_cover_image;
  movieCard.append(movieImage);

  let movieText = document.createElement("div");
  movieText.classList.add("txt");
  movieCard.append(movieText);

  let star = document.createElement("i");
  star.classList.add("fas", "fa-star", "star");
  movieText.append(star);

  let ratingWrap = document.createElement("p");
  ratingWrap.classList.add("rating-wrap");
  movieText.append(ratingWrap);

  let rate = document.createElement("span");
  rate.classList.add("rate");
  rate.textContent =
    movie.rating == 0 ? "Not Rated Yet" : movie.rating + " / 10";

  ratingWrap.append(rate);

  let genres = document.createElement("div");
  genres.classList.add("genres");
  if (movie.genres.length > 1) {
    genres.setAttribute("style", "white-space: pre;");
    genres.textContent = `${movie.genres[0]} \n ${movie.genres[1]}`;
  } else {
    genres.textContent = movie.genres[0];
  }

  movieText.append(genres);

  let downloadLink = document.createElement("a");
  downloadLink.classList.add("download");
  downloadLink.href = movie.torrents[0].url;
  downloadLink.textContent = "Download";
  movieText.append(downloadLink);

  let youtubeLink = document.createElement("a");
  youtubeLink.classList.add("trailer");
  youtubeLink.href = `https://www.youtube.com/watch?v=${movie.yt_trailer_code}`;
  youtubeLink.target = "_blank";
  youtubeLink.textContent = " Watch Trailer";
  movieText.append(youtubeLink);

  let youtubeIcon = document.createElement("i");
  youtubeIcon.className = "fab fa-youtube";
  youtubeLink.prepend(youtubeIcon);

  let cardInfo = document.createElement("div");
  cardInfo.classList.add("info");
  movieContainer.append(cardInfo);

  let footer = document.createElement("div");
  footer.className = "footer";
  cardInfo.append(footer);

  let title = document.createElement("a");
  title.className = "title";
  title.href = ` https://www.imdb.com/title/${movie.imdb_code}`;
  title.target = "_blank";
  title.textContent = movie.title_english;
  title.title = movie.title_english;

  let Movieyear = document.createElement("p");
  Movieyear.className = "year";
  Movieyear.textContent = movie.year;

  footer.append(title, Movieyear);

  document.querySelector(".cards").append(movieContainer);
}
