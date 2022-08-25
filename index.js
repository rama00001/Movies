const express = require("express");
const router = require("./routes/router");
const mongoose = require("mongoose");
const cors = require("cors");
const movies = require("./controllers/Movies");

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

mongoose.connect("mongodb://localhost:27017",{
  // .connect("mongodb+srv://test:test@cluster0.yl4qpmc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.get('/get-paginated', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  movies.getMoviesWithPagination(limit, page).then(data => res.json(data));
});

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});