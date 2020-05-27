/* eslint-disable eqeqeq */
import { movieSearchType } from "./../Constants";
import { celebritySearchType } from "./../Constants";

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

export const getCelebritySearchType = (celebDetails) => {
  let searchType = "";
  if (
    celebDetails.celebrityName &&
    celebDetails.celebrityInitial != 0 &&
    celebDetails.category != 0 &&
    celebDetails.fromBirthYear != 0 &&
    celebDetails.toBirthYear != 0
  ) {
    searchType = celebritySearchType.celebrityNameInitialGenderBirthYear;
  } else if (
    celebDetails.celebrityName &&
    celebDetails.celebrityInitial != 0 &&
    celebDetails.category != 0
  ) {
    searchType = celebritySearchType.celebrityNameInitialGender;
  } else if (
    celebDetails.celebrityName &&
    (celebDetails.celebrityInitial != 0) != 0 &&
    celebDetails.fromBirthYear != 0 &&
    celebDetails.toBirthYear != 0
  ) {
    searchType = celebritySearchType.celebrityNameInitialBirthYear;
  } else if (celebDetails.celebrityName && celebDetails.celebrityInitial != 0) {
    searchType = celebritySearchType.celebrityNameInitial;
  } else if (
    celebDetails.celebrityName &&
    celebDetails.category != 0 &&
    celebDetails.fromBirthYear != 0 &&
    celebDetails.toBirthYear != 0
  ) {
    searchType = celebritySearchType.celebrityNameGenderBirthYear;
  } else if (celebDetails.celebrityName && celebDetails.category != 0) {
    searchType = celebritySearchType.celebrityNameGender;
  } else if (
    celebDetails.celebrityInitial != 0 &&
    celebDetails.category != 0 &&
    celebDetails.fromBirthYear != 0 &&
    celebDetails.toBirthYear != 0
  ) {
    searchType = celebritySearchType.celebrityInitialGenderBirthYear;
  } else if (celebDetails.celebrityInitial != 0 && celebDetails.category != 0) {
    searchType = celebritySearchType.celebrityInitialGender;
  } else if (
    celebDetails.celebrityName &&
    celebDetails.fromBirthYear != 0 &&
    celebDetails.toBirthYear != 0
  ) {
    searchType = celebritySearchType.celebrityNameBirthYear;
  } else if (
    celebDetails.celebrityInitial != 0 &&
    celebDetails.fromBirthYear != 0 &&
    celebDetails.toBirthYear != 0
  ) {
    searchType = celebritySearchType.celebrityInitialBirthYear;
  } else if (
    celebDetails.category != 0 &&
    celebDetails.fromBirthYear != 0 &&
    celebDetails.toBirthYear != 0
  ) {
    searchType = celebritySearchType.genderBirthYear;
  } else if (celebDetails.celebrityName) {
    searchType = celebritySearchType.celebrityName;
  } else if (celebDetails.celebrityInitial != 0) {
    searchType = celebritySearchType.celebrityInitial;
  } else if (celebDetails.fromBirthYear != 0 && celebDetails.toBirthYear != 0) {
    searchType = celebritySearchType.birthYear;
  } else if (celebDetails.category != 0) {
    searchType = celebritySearchType.gender;
  }
  return searchType;
};
