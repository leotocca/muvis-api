const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const schema = {
  type: "object",
  required: ["title", "date", "overview", "rate", "genres"],
  properties: {
    id: { type: "integer" },
    title: { type: "string", minLength: 2 },
    overview: { type: "string", minLength: 50 },
    date: { type: "string" },
    genres: { type: "array", contains: { type: "string" } },
    poster: { type: "string" },
    backdrop: { type: "string" },
    rate: { type: "number", minimum: 1, maximum: 10 },
  },
};

const validate = ajv.compile(schema);

function validateMovies(data) {
  const valid = validate(data);
  if (valid) {
    return true;
  } else {
    return ajv.errorsText(validate.errors);
  }
}

module.exports = validateMovies;
