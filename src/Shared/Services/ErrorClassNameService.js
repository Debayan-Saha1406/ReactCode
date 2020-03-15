import { InputTypes } from "../Constants";


  export const handleErrorClassName = (inputType, value) => {
      debugger;
    if (value === "" || inputType === InputTypes.Email) {
       return "wrap-input100 validate-input alert-validate";
    }

    return "wrap-input100 validate-input";
  }
