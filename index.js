const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || "localhost";
const router = require("./api/routes/routes");

if (process.env.NODE_ENV === "production") {
  app.use(
    morgan("common", {
      skip: (req, res) => res.statusCode < 400,
      stream: `${__dirname}/../morgan.log`,
    })
  );
} else {
  app.use(morgan("dev"));
}

app.use("/api/muvis", router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());

app.use((err, req, res, next) => {
  res.json({ message: err.message });
});

app.listen(PORT, () => console.log(`Server listening on ${hostname}:${PORT}`));
