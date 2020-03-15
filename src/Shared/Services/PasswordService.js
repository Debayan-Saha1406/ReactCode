export const handleDataTypeChange = dataType => {
  return dataType === "text" ? "password" : "text";
};

export const handleEyeIconChange = dataType => {
  return dataType === "text" ? "" : "-slash";
};

export const handlePasswordMatchIcon = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return "check";
  }

  return "close";
};

export const handlePasswordMatchIconColor = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return "green";
  }

  return "red";
};
