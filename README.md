# muvis-api

## How to use the project:

- Clone the repo and run `npm install` to install the dependencies.
- Complete the environment variables with an API KEY from [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) (You have to create an user - it's free!)
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

## Accepted .json object example for PUT and POST requests:

`{ "title": "Steven Universe: The Movie", "overview": "Two years after the events of \"Change Your Mind\", Steven (now 16 years old) and his friends are ready to enjoy the rest of their lives peacefully. However, all of that changes when a new sinister Gem arrives, armed with a giant drill that saps the life force of all living things on Earth. In their biggest challenge ever, the Crystal Gems must work together to save all organic life on Earth within 48 hours.", "date": "September 2, 2019", "genres": [ "Adventure", "Animation", "Comedy", "Family", "Fantasy", "Music", "Science Fiction", "TV Movie" ], "poster": "/8mRgpubxHqnqvENK4Bei30xMDvy.jpg", "backdrop": "/re3ZvlKJg04iLpLRf1xTKHS2wLU.jpg", "rate": 8.8 }`

## Stack:

- NodeJS
- Express
- npm
