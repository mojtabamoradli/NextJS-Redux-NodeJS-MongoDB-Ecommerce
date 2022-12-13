export const authentication = (input, type) => {
  const errors = {};

  if (type === "SIGNUP") {
    if (!input.fullName.trim()) {
      errors.fullName = "Please Enter Your Full Name.";
    } else {
      delete errors.fullName;
    }

    if (!input.email) {
      errors.email = "Please Enter Your Email Address.";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = "Please Enter a Valid Email Address.";
    } else {
      delete errors.email;
    }

    if (!input.password) {
      errors.password = "Please Choose a Password.";
    } else if (input.password.length < 6) {
      errors.password = "Chosen Password needs to Be at Least 6 Character.";
    } else {
      delete errors.password;
    }
  }

  if (type === "LOGIN") {
    if (!input.email) {
      errors.email = "Please Enter Your Email Address.";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = "Please Enter a Valid Email Address.";
    } else {
      delete errors.email;
    }

    if (!input.password) {
      errors.password = "Please Enter Your Password.";
    } else if (input.password.length < 6) {
      errors.password = "Chosen Password needs to Be at Least 6 Character.";
    } else {
      delete errors.password;
    }
  }
  
  if (type === "RESET_PASSWORD") {
    if (!input.password) {
      errors.password = "Please Choose a New Password.";
    } else if (input.password.length < 6) {
      errors.password = "Chosen Password needs to Be at Least 6 Character.";
    } else {
      delete errors.password;
    }
  }
  if (type === "FORGOT_PASSWORD" || "LOGIN_WITH_OTP") {
    if (!input.email) {
      errors.email = "Please Enter Your Email Address.";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = "Please Enter a Valid Email Address.";
    } else {
      delete errors.email;
    }
  }

  if (type === "LOGIN_WITH_SMS") {
    if (!input.phone) {
      errors.phone = "Please Enter Your Phone Number.";
    } else if (input.phone.length < 11) {
      errors.phone = "Please Enter a Valid Phone Number.";
    } else {
      delete errors.phone;
    }
  }


  return errors;
};
