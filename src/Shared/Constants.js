import slider1 from "../images/slider1.jpg";
import slider2 from "../images/slider2.jpg";
import slider4 from "../images/slider4.jpg";
import slider3 from "../images/slider3.jpg";

export const apiUrl = {
  baseUrl:
    "http://moviereviewapi-env.eba-p6ivj893.us-west-2.elasticbeanstalk.com/api",
  //"https://localhost:44357/api",
  newsApiUrl: `http://newsapi.org/v2/top-headlines?apiKey=01f9b39795fb4729812099653bdbe6c4&category=entertainment&pageSize=10`,
  login: "/adminlogin",
  userInfo: `/userInfo/`,
  profileImage: "/profileImage/",
  register: "/register",
  forgotPassword: "/forgotPassword",
  resetPassword: "/resetPassword",
  updateUserStatus: "/userStatus/",
  users: "/users",
  movie: "/movie/",
  reviews: "/reviews",
  updateUserMovieDetails: "/userMovieDetails/",
  movies: "/movies",
  movieLanguages: "/movieLanguages",
  postReview: "/review",
  userLogin: "/userLogin",
  userMovieDetails: `/userMovieDetails/`,
  updateReview: "/review/",
  celebrity: "/celebrity/",
  celebrityMovies: "/celebrityMovies",
  changePassword: "/changePassword",
  userFavoriteMovies: "/userFavoriteMovies",
  userRatedMovies: "/userRatedMovies",
  deleteReview: "/review/",
  deleteUserRating: "/userRating/",
  celebrities: "/celebrities",
  movieGalleryImages: "/movieGallery/",
  directors: "/directors",
  director: "/director/",
  directorMovies: "/directorMovies",
  search: "/search",
  latestMovieTrailers: "/latestMovieTrailers",
  whatToWatchMovies: "/whatToWatchMovies/",
  starsBornToday: "/starsBornToday",
  moviesDirectorsCelebsCount: "/moviesDirectorsCelebsCount",
  addCelebrity: "/celebrity",
  addDirector: "/director",
  genres: "/genres",
  allCelebs: "/allCelebs/",
  allDirectors: "/allDirectors/",
  addMovie: "/movie",
  userReviewedMovies: "/userReviewedMovies",
  contactUs: "/contactUs",
  editCelebrity: "/editCelebrity/",
};

export const constants = {
  userDetails: "userDetails",
  loginDetails: "loginDetails",
  userMovieRating: "userMovieRating",
  passwordStrength: {
    0: "Very Weak",
    1: "Weak",
    2: "Medium",
    3: "Strong",
    4: "Very Strong",
    5: "Excellent",
  },
};

export const InputTypes = {
  Email: "Email",
  Password: "Password",
  ConfirmPassword: "ConfirmPassword",
  Name: "Name",
};

export const httpVerbs = {
  Post: "POST",
  Get: "GET",
  Put: "PUT",
  Delete: "DELETE",
};

export const statusCode = {
  500: "Something Went Wrong !",
  404: "Resource Not Found",
  400: "Bad Request",
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const pageType = {
  grid: "grid",
  list: "list",
};

export const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const years = [1960, 1970, 1980, 1990, 2000, 2010, 2020];

export const movieSearchType = {
  all: "All",
  movie: "Movie",
  rating: "Rating",
  releaseYear: "ReleaseYear",
  movieReleaseYear: "MovieReleaseYear",
  ratingReleaseYear: "RatingReleaseYear",
  movieRatingReleaseYear: "MovieRatingReleaseYear",
  movieRating: "MovieRating",
  movieLanguageReleaseYear: "MovieLanguageReleaseYear",
  movieLanguage: "MovieLanguage",
  ratingLanguage: "RatingLanguage",
  ratingLanguageReleaseYear: "RatingLanguageReleaseYear",
  movieRatingLanguageReleaseYear: "MovieRatingLanguageReleaseYear",
  movieRatingLanguage: "MovieRatingLanguage",
  language: "Language",
  languageReleaseYear: "LanguageReleaseYear",
};

export const sortColumns = {
  movieName: "MovieName",
  rating: "Rating",
  celebrityName: "CelebrityName",
  reviewDate: "ReviewDate",
  releaseDate: "ReleaseDate",
  birthDate: "BirthDate",
  directorName: "DirectorName",
  netWorth: "NetWorth",
  topDirectors: "TopDirectors",
};

export const sortDirection = {
  asc: "asc",
  desc: "desc",
};

export const movieDetailTabs = {
  overview: "overview",
  review: "review",
  cast: "cast",
};

export const popupType = {
  login: "Login",
  register: "Register",
  addReview: "AddReview",
  editReview: "EditReview",
  logout: "Logout",
  forgotPassword: "ForgotPassword",
  resetPassword: "ResetPassword",
  information: "Information",
  deleteReview: "DeleteReview",
  deleteRating: "DeleteRating",
};

export const page = {
  details: "details",
};

export const detailPageTabs = {
  overview: "overview",
  biography: "biography",
  filmography: "filmography",
};

export const gender = {
  male: "male",
  female: "female",
};

export const menuItem = {
  home: "home",
  movies: "movie",
  loggedInEmail: "loggedInEmail",
  celeb: "celeb",
  director: "director",
  user: "user",
  about: "about",
  none: "none",
  contactUs: "contactUs",
  news: "currentNews",
  privacyPolicy: "privacyPolicy",
  termsOfUse: "termsOfUse",
};

export const userProfileSideMenuItem = {
  profile: "profile",
  favoriteMovies: "favoriteMovies",
  ratedMovies: "ratedMovies",
  reviewedMovies: "reviewedMovies",
};

export const celebritySortTypeList = [
  { id: 1, value: "Celeb Name Ascending" },
  { id: 2, value: "Celeb Name Descending" },
  { id: 3, value: "Birth Date Ascending" },
  { id: 4, value: "Birth Date Descending" },
  { id: 5, value: "Net Worth Ascending" },
  { id: 6, value: "Net Worth Descending" },
];

export const movieSortTypeList = [
  { id: 1, value: "Movie Name Ascending" },
  { id: 2, value: "Movie Name Descending" },
  { id: 3, value: "Rating Ascending" },
  { id: 4, value: "Rating Descending" },
  { id: 5, value: "Release Date Ascending" },
  { id: 6, value: "Release Date Descending" },
];

export const filmographySortTypeList = [
  { id: 1, value: "Movie Name Ascending" },
  { id: 2, value: "Movie Name Descending" },
  { id: 3, value: "Release Date Ascending" },
  { id: 4, value: "Release Date Descending" },
];

export const userMovieRatingSortTypeList = [
  { id: 1, value: "Movie Name Ascending" },
  { id: 2, value: "Movie Name Descending" },
  { id: 3, value: "Rating Ascending" },
  { id: 4, value: "Rating Descending" },
];

export const userMovieReviewSortTypeList = [
  { id: 1, value: "Movie Name Ascending" },
  { id: 2, value: "Movie Name Descending" },
  { id: 3, value: "Review Date Ascending" },
  { id: 4, value: "Review Date Descending" },
];

export const reviewSortTypeList = [
  { id: 1, value: "Review Date Ascending" },
  { id: 2, value: "Review Date Descending" },
];

export const directorSortTypeList = [
  { id: 1, value: "Director Name Ascending" },
  { id: 2, value: "Director Name Descending" },
  { id: 3, value: "Birth Date Ascending" },
  { id: 4, value: "Birth Date Descending" },
  { id: 5, value: "Top Directors" },
];

export const celebritySearchType = {
  celebrityName: "CelebrityName",
  celebrityNameInitialGenderBirthYear: "CelebrityNameInitialGenderBirthYear",
  celebrityNameInitialGender: "CelebrityNameInitialGender",
  celebrityNameInitialBirthYear: "CelebrityNameInitialBirthYear",
  celebrityNameInitial: "CelebrityNameInitial",
  celebrityNameGenderBirthYear: "CelebrityNameGenderBirthYear",
  celebrityNameGender: "CelebrityNameGender",
  celebrityInitialGenderBirthYear: "CelebrityInitialGenderBirthYear",
  celebrityInitialGender: "CelebrityInitialGender",
  celebrityNameBirthYear: "CelebrityNameBirthYear",
  celebrityInitialBirthYear: "CelebrityInitialBirthYear",
  celebrityInitial: "CelebrityInitial",
  birthYear: "BirthYear",
  gender: "Gender",
  genderBirthYear: "GenderBirthYear",
};

export const alphabets = [
  { id: "a", value: "a" },
  { id: "b", value: "b" },
  { id: "c", value: "c" },
  { id: "d", value: "d" },
  { id: "e", value: "e" },
  { id: "f", value: "f" },
  { id: "g", value: "g" },
  { id: "h", value: "h" },
  { id: "i", value: "i" },
  { id: "j", value: "j" },
  { id: "k", value: "k" },
  { id: "l", value: "l" },
  { id: "m", value: "m" },
  { id: "n", value: "n" },
  { id: "o", value: "o" },
  { id: "p", value: "p" },
  { id: "q", value: "q" },
  { id: "r", value: "r" },
  { id: "s", value: "s" },
  { id: "t", value: "t" },
  { id: "u", value: "u" },
  { id: "v", value: "v" },
  { id: "w", value: "w" },
  { id: "x", value: "x" },
  { id: "y", value: "y" },
  { id: "z", value: "z" },
];

export const countList = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  // { id: 10, value: 10 },
  // { id: 25, value: 25 },
  // { id: 50, value: 50 },
];

export const detailPageType = {
  celebrity: "celebrity",
  director: "director",
};

export const searchBarOptionsList = [
  { id: 1, value: "All" },
  { id: 2, value: "Movie" },
  { id: 3, value: "Celebrity" },
  { id: 4, value: "Director" },
];

export const searchBarSubType = {
  movie: "Movie",
  celebrity: "Celebrity",
  director: "Director",
  all: "All",
};

export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
];

export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

export const recentlyViewed = "RecentlyViewed";

export const sliderItems = [
  { id: 1, image: slider1 },
  { id: 2, image: slider2 },
  { id: 3, image: slider3 },
  { id: 4, image: slider4 },
];

export const sliderXCoordinate = 471;

export const doughnutLabels = ["Movies", "Celebs", "Directors"];
export const doughnutData = {
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: ["#00b5e9", "#fa4251", "#008000"],
      hoverBackgroundColor: ["#00b5e9", "#fa4251", "#008000"],
      borderWidth: [0, 0, 0],
      hoverBorderColor: ["transparent", "transparent", "transparent"],
    },
  ],
  labels: ["Movies", "Celebs", "Directors"],
};
export const doughnutOptions = {
  maintainAspectRatio: false,
  responsive: true,
  cutoutPercentage: 55,
  animation: {
    animateScale: true,
    animateRotate: true,
  },
  legend: {
    display: false,
  },
  tooltips: {
    titleFontFamily: "Poppins",
    xPadding: 15,
    yPadding: 10,
    caretPadding: 0,
    bodyFontSize: 16,
  },
};

export const route = {
  celebrity: "celebrity",
  dashboard: "admin",
  users: "users",
  directors: "directors",
  movie: "movie",
  addCelebrity: "add-celebrities",
  viewCelebrity: "view-celebs",
  editCelebrity: "edit-celeb",
  addDirector: "add-directors",
  viewDirectors: "view-directors",
  editDirectors: "edit-directors",
};

export const userStatus = {
  blocked: 1,
  active: 2,
  pending: 3,
};

export const userRole = {
  admin: 1,
  user: 2,
};

export const WhatToWatchType = {
  HighestRated: 1,
  MostReviewed: 2,
  ComingSoon: 3,
};
