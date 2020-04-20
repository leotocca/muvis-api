# muvis-api

## How to use the project:

- Clone the repo and run `npm install` to install the dependencies.
- Complete the environment variables with an API KEY from [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) (You have to create an user - it's free!)
- Run `npm run dev` and do the requests to `localhost:3000/api/muvis/`

## Endpoints:

| Method | Endpoint            | Usage                                              | Returns |
| ------ | ------------------- | -------------------------------------------------- | ------- |
| GET    | `/api/muvis`        | 100 movies in `json` format                        | Movies  |
| POST   | `/api/muvis`        | Adds a new movie, returns the movie that was added | Movie   |
| GET    | `/api/muvis/:id`    | Get a movie with specified ID                      | Movie   |
| PUT    | `/api/muvis/:id`    | Modify a movie with specified ID                   | Movie   |
| DELETE | `/api/muvis/:id`    | Delete a movie with specified ID                   | Movies  |
| GET    | `/api/muvis/years`  | Get the list of years in the DB                    | Years   |
| GET    | `/api/muvis/rates`  | Get the list of rates in the DB                    | Rates   |
| GET    | `/api/muvis/genres` | Get the list of genres in the DB                   | Genres  |

## Accepted query strings:

| Method | Endpoint     | Query string    | Usage                                                   |
| ------ | ------------ | --------------- | ------------------------------------------------------- |
| GET    | `/api/muvis` | `?year=`        | Get a list of movies that were launched that year       |
| GET    | `/api/muvis` | `?genre=`       | Get a list of movies that contains the requested genre  |
| GET    | `/api/muvis` | `?sortBy=title` | Get all the movies sorted by title (in ascending order) |
| GET    | `/api/muvis` | `?sortBy=year`  | Get all the movies sorted by year (in ascending order)  |
| GET    | `/api/muvis` | `?sortBy=rate`  | Get all the movies sorted by rate (in ascending order)  |

## Movie Example

```json
{
  "id": 155,
  "title": "The Dark Knight",
  "overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
  "date": "July 16, 2008",
  "genres": ["Action", "Crime", "Drama", "Thriller"],
  "poster": "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "backdrop": "/cfT29Im5VDvjE0RpyKOSdCKZal7.jpg",
  "rate": 8.4
}
```

## Accepted .json object example for PUT and POST requests:

```json
{
  "title": "Steven Universe: The Movie",
  "overview": "Two years after the events of \"Change Your Mind\", Steven (now 16 years old) and his friends are ready to enjoy the rest of their lives peacefully. However, all of that changes when a new sinister Gem arrives, armed with a giant drill that saps the life force of all living things on Earth. In their biggest challenge ever, the Crystal Gems must work together to save all organic life on Earth within 48 hours.",
  "date": "September 2, 2019",
  "genres": [
    "Adventure",
    "Animation",
    "Comedy",
    "Family",
    "Fantasy",
    "Music",
    "Science Fiction",
    "TV Movie"
  ],
  "poster": "/8mRgpubxHqnqvENK4Bei30xMDvy.jpg",
  "backdrop": "/re3ZvlKJg04iLpLRf1xTKHS2wLU.jpg",
  "rate": 8.8
}
```

## Stack:

- NodeJS
- Express
- npm

Inspiration for the api documentation taken from [Spotify API](https://developer.spotify.com/documentation/web-api/reference/)
