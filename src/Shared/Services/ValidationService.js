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
    data.isErrorExist = true;
  } else {
    data.errorClassName = "wrap-input100 validate-input";
    data.isErrorExist = false;
  }
  data.email = value;
};

export const validatePassword = (value, data) => {
  if (value.trim() === "") {
    data.className = "input100";
    data.errorClassName = "wrap-input100 validate-input alert-validate";
    data.isErrorExist = true;
  } else {
    data.className = "input100 has-val";
    data.errorClassName = "wrap-input100 validate-input";
    data.isErrorExist = false;
  }
  data.password = value;
};

export const validateName = (value, data) => {
  if (value.trim() === "") {
    data.className = "input100";
    data.errorClassName = "wrap-input100 validate-input alert-validate";
    data.isErrorExist = true;
  } else {
    data.className = "input100 has-val";
    data.errorClassName = "wrap-input100 validate-input";
    data.isErrorExist = false;
  }
  data.name = value;
};

export const validateToken = (value, data) => {
  if (value.trim() === "") {
    data.className = "input100";
    data.errorClassName = "wrap-input100 validate-input alert-validate";
    data.isErrorExist = true;
  } else {
    data.className = "input100 has-val";
    data.errorClassName = "wrap-input100 validate-input";
    data.isErrorExist = false;
  }
  data.token = value;
};

export const handleLastName = (value, data) => {
  if (value.trim() === "") {
    data.className = "input100";
  } else {
    data.className = "input100 has-val";
  }
  data.name = value;
};

export const validateInputField = (value) => {
  if (!value || value.trim() === "") {
    return true;
  } else {
    return false;
  }
};

export const validateUserEmail = (value) => {
  if (
    value.trim() === "" ||
    value
      .trim()
      .match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
      ) == null
  ) {
    return true;
  } else if (value.trim() !== "") {
    return false;
  }
};
