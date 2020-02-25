export const validateEmail = (value, data) => {
  if (value.trim() === "") {
    data.className = "input100";
  } else {
    data.className = "input100 has-val";
  }
  if (
    value
      .trim()
      .match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
      ) == null
  ) {
    data.errorClassName = "wrap-input100 validate-input alert-validate";
  } else {
    data.errorClassName = "wrap-input100 validate-input";
  }
  data.email = value;
};


export const validatePassword = (value, data) => {
    if (value.trim() === "") {
      data.className = "input100";
      data.errorClassName = "wrap-input100 validate-input alert-validate";
    }
    else {
      data.className = "input100 has-val";
      data.errorClassName = "wrap-input100 validate-input";
    }
    data.password = value;
  }

