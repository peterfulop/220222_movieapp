const headers = {
  "x-rapidapi-key": "6da4c88697mshb12e8bd57a8c9e5p1de7c0jsne1b758f9bdef",
  "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
};

const getIdFromObject = (obj) => {
  return obj.map((film) => film["imdb_id"]);
};

const getByTitle = async (type, title) => {
  const param =
    type === "series" ? "series/idbyTitle" : "movie/imdb_id/byTitle";

  const options = {
    method: "GET",
    url: `https://data-imdb1.p.rapidapi.com/${param}/${title}/`,
    headers,
  };
  const byTitle = await axios.request(options);
  const idList = getIdFromObject(byTitle.data.results);
  return await getDataByTypeAndId(idList, type);
};

const getDataByTypeAndId = async (array, type) => {
  return await Promise.all(
    array.map(async (id) => {
      const options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/${type}/id/${id}/`,
        headers,
      };
      let resData = await axios.request(options);
      return resData.data.results;
    })
  );
};

const getByYear = async (type, year, page_size) => {
  const options = {
    method: "GET",
    url: `https://data-imdb1.p.rapidapi.com/${type}/byYear/${year}/`,
    params: { page_size: page_size / 2 },
    headers,
  };
  const byJear = await axios.request(options);
  const idList = getIdFromObject(byJear.data.results);
  return await getDataByTypeAndId(idList, type);
};

const getTopRated = async (type, page_size) => {
  const options = {
    method: "GET",
    url: `https://data-imdb1.p.rapidapi.com/${type}/order/byRating/`,
    params: { page_size: page_size / 2 },
    headers,
  };
  const topRated = await axios.request(options);
  const idList = getIdFromObject(topRated.data.results);
  return await getDataByTypeAndId(idList, type);
};

const getByGenre = async (type, gen, page_size) => {
  const genre = gen.charAt(0).toUpperCase() + gen.slice(1);
  const options = {
    method: "GET",
    url: `https://data-imdb1.p.rapidapi.com/${type}/byGen/${genre}/`,
    params: { page_size: page_size / 2 },
    headers,
  };
  const topRated = await axios.request(options);
  const idList = getIdFromObject(topRated.data.results);
  return await getDataByTypeAndId(idList, type);
};

export const getFavouriteFilms = async (favorites) => {
  return await Promise.all(
    favorites.map(async (fav) => {
      const options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/${fav.type}/id/${fav.imdb_id}/`,
        headers,
      };
      let resData = await axios.request(options);
      return resData.data.results;
    })
  );
};

export const getTopRatedFilms = async (page_size = 10) => {
  const movies = await getTopRated("movie", page_size);
  const series = await getTopRated("series", page_size);
  return movies.concat(series);
};

export const getFilmsByYear = async (year, page_size = 10) => {
  const movies = await getByYear("movie", year, page_size);
  const series = await getByYear("series", year, page_size);
  return movies.concat(series);
};

export const getFilmsByGenre = async (gen, page_size = 10) => {
  const movies = await getByGenre("movie", gen, page_size);
  const series = await getByGenre("series", gen, page_size);
  return movies.concat(series);
};

export const getFilmsByTitle = async (title) => {
  var movies = await getByTitle("series", title);
  var series = await getByTitle("movie", title);
  return movies.concat(series);
};

// const films = await getFilmsByTitle("game");
// films.map((film) => {
//   if (fav.map((x) => x["imdb_id"]).includes(film.imdb_id)) {
//     film.fav = true;
//   }
// });
// const favs = films.filter((film) => film.fav);
