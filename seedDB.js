const callApi = require("./api/utils/api");
const formatMovies = require("./api/utils/formatMovies");

async function seedDB() {
  try {
    let result = [];

    const [movies, genres] = await callApi();

    for (const movie of movies) {
      result.push(formatMovies(movie, genres));
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = seedDB;
