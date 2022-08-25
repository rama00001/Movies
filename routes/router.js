const router = require("express").Router();

const movies = require("../controllers/Movies");

router.get('/get-all', movies.getMovies);
router.get('/get-single/:id', movies.getSingleMovie);
router.put('/updateMovie/:id', movies.updateMovie);
router.delete('/deleteMovie/:id', movies.deleteMovie);
router.post('/add-movie', movies.createMovie);



module.exports = router;