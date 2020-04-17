const schema = {
  title: {
    isLength: {
      errorMessage:
        "movie title is required and should have minimum 2 characters.",
      options: { min: 2 },
    },
    trim: true,
    escape: true,
  },
  date: {
    isString: {
      errorMessage:
        "movie date is required and should be in yyyy-mm-dd format.",
    },
    trim: true,
    escape: true,
  },
  overview: {
    isLength: {
      errorMessage:
        "movie description is required and should have minimum 50 characters.",
      options: { min: 50 },
    },
    trim: true,
    escape: true,
  },
  rate: {
    isFloat: {
      errorMessage:
        "movie rate is required and should be a number between 1 and 10.",
      options: { min: 1, max: 10 },
    },
    trim: true,
    escape: true,
  },
  genres: {
    isArray: {
      errorMessage: "movie genres is required.",
      options: { min: 1 },
    },
  },
};

module.exports = schema;
