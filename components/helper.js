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

export const toggleButton = () => {
  document.getElementById("button").classList.toggle("is-loading");
};
