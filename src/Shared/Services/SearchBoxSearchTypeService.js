/* eslint-disable eqeqeq */
import { movieSearchType } from "./../Constants";

export const setSearchType = (
  movieName,
  selectedRating,
  fromYear,
  toYear,
  languageId
) => {
  let searchType;
  if (
    movieName &&
    selectedRating != 0 &&
    languageId != 0 &&
    fromYear != 0 &&
    toYear != 0
  ) {
    searchType = movieSearchType.movieRatingLanguageReleaseYear;
  } else if (movieName && selectedRating != 0 && languageId != 0) {
    searchType = movieSearchType.movieRatingLanguage;
  } else if (movieName && selectedRating != 0 && fromYear != 0 && toYear != 0) {
    searchType = movieSearchType.movieRatingReleaseYear;
  } else if (movieName && selectedRating != 0) {
    searchType = movieSearchType.movieRating;
  } else if (movieName && languageId != 0 && fromYear != 0 && toYear != 0) {
    searchType = movieSearchType.movieLanguageReleaseYear;
  } else if (movieName && languageId != 0) {
    searchType = movieSearchType.movieLanguage;
  } else if (
    selectedRating != 0 &&
    languageId != 0 &&
    fromYear != 0 &&
    toYear != 0
  ) {
    searchType = movieSearchType.ratingLanguageReleaseYear;
  } else if (selectedRating != 0 && languageId != 0) {
    searchType = movieSearchType.ratingLanguage;
  } else if (movieName && fromYear != 0 && toYear != 0) {
    searchType = movieSearchType.movieReleaseYear;
  } else if (selectedRating != 0 && fromYear != 0 && toYear != 0) {
    searchType = movieSearchType.ratingReleaseYear;
  } else if (movieName) {
    searchType = movieSearchType.movie;
  } else if (selectedRating != 0) {
    searchType = movieSearchType.rating;
  } else if (fromYear != 0 && toYear != 0) {
    searchType = movieSearchType.releaseYear;
  } else if (languageId != 0) {
    searchType = movieSearchType.language;
  }
  return searchType;
};
