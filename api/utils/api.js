const got = require("got");

async function getMovies(moviesArray, page) {
  if (moviesArray.length < 100) {
    try {
      const response = await got(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
      );

      const { results } = JSON.parse(response.body);

      results.forEach((movie) => {
        moviesArray.push(movie);
      });
    } catch (error) {
      console.error("Error: ", error.message);
    }

    page += 1;

    return getMovies(moviesArray, page);
  }

  return moviesArray.slice(0, 100);
}

async function getGenres() {
  const genresArray = [];
  try {
    const response = await got(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );

    const { genres } = JSON.parse(response.body);

    genres.forEach((genre) => {
      genresArray.push(genre);
    });

    return genresArray;
  } catch (error) {
    console.error(error);
  }
}

async function makeRequests() {
  try {
    const [movies, genres] = await Promise.all([getMovies([], 1), getGenres()]);

    return [movies, genres];
  } catch (error) {
    console.error(error);
  }
}

module.exports = makeRequests;
