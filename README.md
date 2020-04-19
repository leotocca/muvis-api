# muvis-api

## How to use the project:

- Clone the repo and run `npm install` to install the dependencies.
- Complete the environment variables with an API KEY from [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction)
- Then run `npm run dev` and do the requests to `localhost:3000/api/muvis/`

## Endpoints:

| Endpoint  | Method | Response                                           |
| --------- | ------ | -------------------------------------------------- |
| `/`       | GET    | 100 movies in `json` format                        |
| `/`       | POST   | Adds a new movie, returns the movie that was added |
| `/:id`    | GET    | The movie with the ID param                        |
| `/:id`    | PUT    | Modifies the movie with the ID param               |
| `/:id`    | DELETE | Deletes the movie with the ID param                |
| `/years`  | GET    | Returns the list of years in the DB                |
| `/rates`  | GET    | Returns the list of rates in the DB                |
| `/genres` | GET    | Returns the list of genres in the DB               |

## Accepted query strings:

| Endpoint | Method | Query string    | Response                                            |
| -------- | ------ | --------------- | --------------------------------------------------- |
| `/`      | GET    | `?year=`        | A list of movies that were launched that year       |
| `/`      | GET    | `?genre=`       | A list of movies that contains the requested genre  |
| `/`      | GET    | `?sortBy=title` | The 100 movies sorted by title (in ascending order) |
| `/`      | GET    | `?sortBy=year`  | The 100 movies sorted by year (in ascending order)  |
| `/`      | GET    | `?sortBy=rate`  | The 100 movies sorted by rate (in ascending order)  |

## Stack:

- NodeJS
- Express
- npm
