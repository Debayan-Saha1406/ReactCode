export const apiUrl = {
  baseUrl:
    "http://moviereviewapi-env.eba-p6ivj893.us-west-2.elasticbeanstalk.com/api",
  //"https://localhost:44357/api",
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

export const ratingStars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  celebrityName: "celebrityName",
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

export const celebrityTabs = {
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
  movies: "movies",
  about: "about",
  loggedInEmail: "loggedInEmail",
  celebrities: "celebrities",
};

export const userProfileSideMenuItem = {
  profile: "profile",
  favoriteMovies: "favoriteMovies",
  ratedMovies: "ratedMovies",
};

export const celebritySortTypeList = [
  { id: 1, value: "Celeb Name Ascending" },
  { id: 2, value: "Celeb Name Descending" },
];

export const movieSortTypeList = [
  { id: 1, value: "Movie Name Ascending" },
  { id: 2, value: "Movie Name Descending" },
  { id: 3, value: "Rating Ascending" },
  { id: 4, value: "Rating Descending" },
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
  { id: 10, value: 10 },
  { id: 25, value: 25 },
  { id: 50, value: 50 },
];
