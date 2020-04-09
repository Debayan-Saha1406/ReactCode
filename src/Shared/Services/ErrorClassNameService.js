export const handleErrorClassName = (isErrorExist) => {
  if (isErrorExist) {
    return "wrap-input100 validate-input alert-validate";
  }

  return "wrap-input100 validate-input";
};
