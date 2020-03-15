export const apiUrl = {
    baseUrl:"https://reqres.in/api",
    users: "users?page=2"
}


export const constants = {
    userDetails: "userDetails",
    passwordStrength: {
        0: "Very Weak",
        1: "Weak",
        2: "Medium",
        3: "Strong",
        4: "Very Strong",
        5: "Excellent"
      },
}

export const InputTypes = {
  Email: "Email",
  Password: "Password",
  ConfirmPassword: "ConfirmPassword",
  Name:"Name"
};

export const httpVerbs = {
  Post: "POST",
  Get: "GET",
  Put:"PUT",
  Delete:"DELETE"
}

export const statusCode ={
    500 : "Something Went Wrong !",
    404 : "Resource Not Found", 
    400 : "Bad Request"

}
