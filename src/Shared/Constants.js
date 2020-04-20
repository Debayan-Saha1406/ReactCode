export const apiUrl = {
  baseUrl:
    "http://moviereviewapi-env.eba-p6ivj893.us-west-2.elasticbeanstalk.com/api",
  //"https://localhost:44357/api",
  login: "/login",
  update: `/userInfo/`,
  profileImage: "/profileImage/",
  register: "/register",
  forgotPassword: "/forgotPassword",
  resetPassword: "/resetPassword",
  updateUserStatus: "/userStatus/",
  users: "/users",
};

export const constants = {
  userDetails: "userDetails",
  loginDetails: "loginDetails",
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
