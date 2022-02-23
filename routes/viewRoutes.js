const path = require("path");
const express = require("express");
const router = express.Router();

const {
  getTopRatedFilms,
  getFilmsByYear,
  getFilmsByGenre,
} = require("../API/imdbAPI.js");

router.get("/", async (req, res) => {
  var topRated = await getTopRatedFilms();
  var filmek2021 = await getFilmsByYear(2021, 20);
  var horror = await getFilmsByGenre("horror", 20);
  var drama = await getFilmsByGenre("drama", 20);
  var action = await getFilmsByGenre("action", 20);
  var thriller = await getFilmsByGenre("thriller", 20);

  res.status(200).render("home", {
    title: "Home",
    blocks: [
      {
        title: "Legjobbra értékeltek",
        movies: topRated,
      },
      {
        title: "Filmek, 2021-ből",
        movies: filmek2021,
      },
      {
        title: "Thrillerek",
        movies: thriller,
      },
      {
        title: "Horror filmek",
        movies: horror,
      },
      {
        title: "Drámák",
        movies: drama,
      },
      {
        title: "Akció filmek",
        movies: action,
      },
    ],
  });
});

module.exports = router;
