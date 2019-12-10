export const renderDropdown = (category, data) => {
  let select = [];

  switch (category) {
    case "age":
      for (let i = 1; i <= 80; i++) {
        select.push(
          <option value={i} key={i}>
            {i}
          </option>
        );
      }
      break;
    case "country":
      if (data) {
        for (let i = 0; i < data.length; i++) {
          select.push(
            <option value={data[i].alpha3Code} key={data[i].alpha3Code}>
              {data[i].name}
            </option>
          );
        }
      }
      break;
    case "race":
      const races = ["Chinese", "Malay", "Indian", "Others"];
      races.map(race => {
        select.push(
          <option value={race} key={race}>
            {race}
          </option>
        );
      });
  }

  const options = select.map(option => {
    return option;
  });

  return options;
};

export const toggleDropdown = () => {
  document.getElementById("burger").classList.toggle("is-active");
  document.getElementById("navbarBasicExample").classList.toggle("is-active");
};

export const toggleSignin = () => {
  document.getElementById("signin").classList.toggle("is-active");
};

export const toggleSignup = () => {
  document.getElementById("signup").classList.toggle("is-active");
};

export const toggleButton = button => {
  if (button == "signin") {
    document.getElementById("signinButton").classList.toggle("is-loading");
  }

  if (button == "signup" || button == "update") {
    document.getElementById("button").classList.toggle("is-loading");
  }
};

export const validateInput = input => {
  const usernameRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (input.username == "") {
    return "Username cannot be empty!";
  } else if (input.username.search(usernameRegex)) {
    return "Username is invalid!";
  }

  if (input.email == "") {
    return "Email cannot be empty!";
  } else if (input.email.search(emailRegex)) {
    return "Email is invalid!";
  }

  if (input.age == 0) {
    return "Age must be selected!";
  }

  if (input.gender == "") {
    return "Gender must be selected!";
  }

  if (input.country == "") {
    return "Country must be selected!";
  }

  if (input.race == "") {
    return "Race must be selected!";
  }

  if (input.height == "") {
    return "Height cannot be empty!";
  } else if (parseFloat(input.height) <= 0) {
    return "Height cannot be zero or negative!";
  } else if (input.height.includes("e")) {
    return "Height can only be a number!";
  }

  if (input.weight == "") {
    return "Weight cannot be empty!";
  } else if (parseFloat(input.weight) <= 0) {
    return "Weight cannot be zero or negative!";
  } else if (input.weight.includes("e")) {
    return "Weight can only be a number!";
  }

  if (input.password == "") {
    return "Password cannot be empty!";
  } else if (input.password.length < 6) {
    return "Password length must be at least 6 characters!";
  }

  if (input.confirmPass == "") {
    return "Confirm Password cannot be empty!";
  } else if (input.confirmPass != input.password) {
    return "Password and Confirm Password do not match!";
  }
};
