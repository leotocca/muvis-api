const makeRequests = require("./api");
const formatMovies = require("./formatMovies");
const DB = require("./dbAPI");
const db = new DB();

async function seedDB(db) {
  try {
    const [movies, genres] = await makeRequests();

    if (db.length() === 0) {
      for (const movie of movies) {
        db.addMovieToDBFromAPI(formatMovies(movie, genres));
      }
    }
  } catch (error) {
    console.error(error);
  }
  return db;
}

seedDB(db);

module.exports = db;
