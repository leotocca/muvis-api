const dayjs = require("dayjs");

function formatMovies(movieToProcess, genres) {
  return {
    id: movieToProcess.id,
    title: movieToProcess.title,
    overview: movieToProcess.overview,
    date: formatDate(movieToProcess.release_date),
    genres: formatGenres(movieToProcess.genre_ids, genres),
    poster:
      movieToProcess.poster_path ||
      "https://via.placeholder.com/300x450.jpg?text=No+image+found",
    backdrop:
      movieToProcess.backdrop_path ||
      "https://via.placeholder.com/300x450.jpg?text=No+image+found",
    rate: movieToProcess.vote_average
  };
}

function formatDate(date) {
  return dayjs(date).format("MMMM D, YYYY");
}

function formatGenres(movieGenres, genreIds) {
  let genreNames = [];
  genreIds.forEach(genre => {
    if (movieGenres.includes(genre.id)) {
      genreNames.push(genre.name);
    }
  });
  return genreNames;
}

module.exports = formatMovies;
