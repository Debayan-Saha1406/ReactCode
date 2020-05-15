export const apiUrl = {
  baseUrl:
    "http://moviereviewapi-env.eba-p6ivj893.us-west-2.elasticbeanstalk.com/api",
  // "https://localhost:44357/api",
  login: "/adminlogin",
  update: `/userInfo/`,
  profileImage: "/profileImage/",
  register: "/register",
  forgotPassword: "/forgotPassword",
  resetPassword: "/resetPassword",
  updateUserStatus: "/userStatus/",
  users: "/users",
  movie: "/movie/",
  reviews: "/reviews",
  rating: "/rating/",
  movies: "/movies",
  movieLanguages: "/movieLanguages",
  postReview: "/review",
  userLogin: "/userLogin",
  movieUserRatings: `/movieUserRatings/`,
  updateReview: "/review/",
  celebrity: "/celebrity/",
  celebrityMovies: "/celebrityMovies",
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
};
