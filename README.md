# muvis-api

# How to use the project:

Clone the repo and run "node index.js". Then, do the requestes using POSTMAN to "localhost:3000/api/muvis/"

# Endpoints:

| Endpoint  | Method | Response                                           |
| --------- | ------ | -------------------------------------------------- |
| "/"       | GET    | 100 movies in json format                          |
| "/"       | POST   | Adds a new movie, returns the movie that was added |
| "/:id"    | GET    | The movie with the ID param                        |
| "/:id"    | PUT    | Modifies the movie with the ID param               |
| "/:id"    | DELETE | Deletes the movie with the ID param                |
| "/years"  | GET    | Returns the list of years in the DB                |
| "/rates"  | GET    | Returns the list of rates in the DB                |
| "/genres" | GET    | Returns the list of genres in the DB               |
