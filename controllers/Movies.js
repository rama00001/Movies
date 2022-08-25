const Movie = require("../model/Movie");

const getMovies = (req, res) => {
  Movie.find((err, movies) => {
    if (err) {
      res.send(err);
    }
    res.json(movies);
  });
};

const createMovie = (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed,
  });

  movie.save((err, movie) => {
    if (err) {
      res.send(err);
    }
    res.json(movie);
  });
};

const getSingleMovie = (req, res) => {
  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      res.send(err);
    }
    res.json(movie);
  });
};

const updateMovie = (req, res) => {
  Movie.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
      },
    },
    { new: true },
    (err, Movie) => {
      if (err) {
        res.send(err);
      } else res.json(Movie);
    }
  );
};

const getMoviesWithPagination = (pageSize, page)=> {
        const movies =  Movie.find({}).limit(pageSize).skip(pageSize * page);;
        console.log('movies:::', movies);
        return movies;
    }

const deleteMovie = (req, res) => {
  Movie.deleteOne({ _id: req.params.id })
    .then(() => res.json({ message: "Movie Deleted" }))
    .catch((err) => res.send(err));
};


module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getSingleMovie,
  getMoviesWithPagination
};