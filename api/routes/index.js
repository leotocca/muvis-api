const express = require("express");
const router = express.Router();
const db = require("../utils/seedDB");
const { checkSchema, validationResult } = require("express-validator");
const schema = require("../utils/schemaValidation.js");

router
  .route("/")
  .get((req, res, next) => {
    if (req.query.year || req.query.genre || req.query.sortBy) {
      if (req.query.year) {
        res.status(200).json(db.getByYear(req.query.year));
      } else if (req.query.genre) {
        res.status(200).json(db.getByGenre(req.query.genre));
      } else {
        res.status(200).json(db.sortBy(req.query.sortBy));
      }
    } else {
      res.status(200).json(db.getMovies());
    }
  })
  .post(checkSchema(schema), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      res.status(404);
      next(err);
    }

    if (!db.checkIfMovieExistsByTitle(req.body.title)) {
      db.addMovieToDBFromPOSTRequest(req.body);
      res.status(200).json(db.findMovieByTitle(req.body.title));
    } else {
      const err = new Error(
        `404 - The movie can't be added, it already exists in db`
      );
      res.status(404);
      next(err);
    }
  })
  .put(checkSchema(schema), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      res.status(404);
      next(err);
    }

    if (db.checkIfMovieExistsByID(req.body.id)) {
      db.updateMovieInDB(movie);
      res.status(200).json(db.findMovieByTitle(req.body.title));
    } else {
      db.addMovieToDBFromPOSTRequest(req.body);
      res.status(200).json(db.findMovieByTitle(req.body.title));
    }
  });

router.route("/genres").get((req, res, next) => {
  res.status(200).json(db.getGenres());
});

router.route("/years").get((req, res, next) => {
  res.status(200).json(db.getYears());
});

router.route("/rates").get((req, res, next) => {
  res.status(200).json(db.getRates());
});

router
  .route("/:id")
  .get((req, res, next) => {
    if (db.checkIfMovieExistsByID(req.params.id)) {
      res.status(200).json(db.findMovieByID(req.params.id));
    } else {
      const err = new Error(
        `404 - The movie with the id ${req.params.id} was not found`
      );
      res.status = 404;
      next(err);
    }
  })
  .put(checkSchema(schema), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      res.status(404);
      next(err);
    }

    if (db.checkIfMovieExistsByID(req.params.id)) {
      db.updateMovieInDB(req.body);
      res.status(200).json(db.findMovieByID(req.params.id));
    } else {
      const err = new Error(
        `404 - The movie with the id ${req.params.id} was not found`
      );
      res.status(404);
      next(err);
    }
  })
  .delete((req, res, next) => {
    if (db.checkIfMovieExistsByID(req.params.id)) {
      res.status(200).json(db.deleteMovieFromDB(req.params.id));
    } else {
      const err = new Error(
        `404 - The movie with the id ${req.params.id} was not found`
      );
      res.status(404);
      next(err);
    }
  });

module.exports = router;
