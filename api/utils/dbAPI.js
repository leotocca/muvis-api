const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const dayjs = require("dayjs");
const validateMovies = require("../utils/validateMovies");

class DB {
  constructor() {
    this.db = low(new FileSync("db.json"));
    this.db.defaults({ movies: [] }).write();

    this.genres = new Set();
    this.years = new Set();
    this.rates = new Set();
  }

  getMovies() {
    return this.db.getState().movies;
  }

  addMovieToDBFromPOSTRequest(movie) {
    if (validateMovies(movie) === true && !this.findMovieByTitle(movie.title)) {
      movie.id = this.getNextID();

      movie.genres.forEach((genre) => this.genres.add(genre));
      this.years.add(dayjs(movie.date).format("YYYY"));
      this.rates.add(movie.rate);

      this.db.get("movies").push(movie).write();
      return true;
    }
  }

  addMovieToDBFromAPI(movie) {
    if (validateMovies(movie) === true && !this.findMovieByTitle(movie.title)) {
      movie.genres.forEach((genre) => this.genres.add(genre));
      this.years.add(dayjs(movie.date).format("YYYY"));
      this.rates.add(movie.rate);

      this.db.get("movies").push(movie).write();
    }
  }

  updateMovieInDB(movie) {
    this.db
      .get("movies")
      .find({ id: Number(movie.id) })
      .assign(movie)
      .write();
  }

  deleteMovieFromDB(movieID) {
    const movieToDelete = this.db
      .get("movies")
      .find({ id: Number(movieID) })
      .value();

    movieToDelete.genres.forEach((genre) => this.genres.delete(genre));
    this.rates.delete(movieToDelete.rate);
    this.years.delete(dayjs(movieToDelete.date).format("YYYY"));

    this.db
      .get("movies")
      .remove({ id: Number(movieID) })
      .write();
    return this.getMovies();
  }

  getNextID() {
    let arrOfMoviesLength = this.db.getState().movies.length;
    let biggestID = this.db
      .get("movies")
      .sortBy("id")
      .take(arrOfMoviesLength)
      .value()[arrOfMoviesLength - 1].id;

    return biggestID + 1;
  }

  checkIfMovieExistsByID(movieID) {
    const result = this.db
      .get("movies")
      .find({ id: Number(movieID) })
      .value();
    return result !== undefined ? true : false;
  }

  checkIfMovieExistsByTitle(movieTitle) {
    const result = this.db.get("movies").find({ title: movieTitle }).value();

    return result !== undefined ? true : false;
  }

  findMovieByID(movieID) {
    const result = this.db
      .get("movies")
      .find({ id: Number(movieID) })
      .value();

    return result !== undefined ? result : false;
  }

  findMovieByTitle(movieTitle) {
    const result = this.db.get("movies").find({ title: movieTitle }).value();

    return result !== undefined ? result : false;
  }

  getGenres() {
    const result = [];
    this.getMovies().forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (!result.includes(genre)) {
          result.push(genre);
        }
      });
    });

    return result.sort();
  }

  getYears() {
    const result = [];
    this.getMovies().forEach((movie) => {
      const year = dayjs(movie.date).format("YYYY");
      if (!result.includes(year)) {
        result.push(year);
      }
    });
    return result.sort();
  }

  getRates() {
    const result = [];
    this.getMovies().forEach((movie) => {
      if (!result.includes(movie.rate)) {
        result.push(movie.rate);
      }
    });
    return result.sort();
  }

  getByYear(year) {
    const result = [];
    this.getMovies().forEach((movie) => {
      const yearOfMovie = dayjs(movie.date).format("YYYY");
      if (!result.includes(yearOfMovie) && yearOfMovie === year) {
        result.push(movie);
      }
    });
    return result.length !== 0 ? result.sort() : result;
  }

  getByGenre(genre) {
    const result = [];
    this.getMovies().forEach((movie) => {
      movie.genres.forEach((genreInMovie) => {
        if (
          !result.includes(genreInMovie) &&
          genreInMovie === this.uppercaseFirstLetter(genre)
        ) {
          result.push(movie);
        }
      });
    });
    return result.length !== 0 ? result.sort() : result;
  }

  sortBy(criteria) {
    const movies = this.db.getState().movies.slice();

    if (movies.length !== 0) {
      if (criteria === "year") {
        return movies.sort(
          (a, b) =>
            Number(dayjs(a.date).format("YYYY")) -
            Number(dayjs(b.date).format("YYYY"))
        );
      } else if (criteria === "rate") {
        return movies.sort((a, b) => a.rate - b.rate);
      } else if (criteria === "title") {
        return movies.sort((a, b) => {
          const aTitle = a.title;
          const bTitle = b.title;
          if (aTitle > bTitle) {
            return 1;
          }
          if (aTitle < bTitle) {
            return -1;
          }
          return 0;
        });
      }
    } else {
      return movies;
    }
  }

  uppercaseFirstLetter(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  }

  length() {
    return this.db.get("movies").size().value();
  }
}

module.exports = DB;
