export const renderDropdown = (category, data, data2) => {
  let select = [];

  switch (category) {
    case "age":
      for (let i = 1; i <= 80; i++) {
        select.push(
          <option value={i} key={i} selected={data && data.age == i ? true : false}>
            {i}
          </option>
        );
      }
      break;
    case "country":
      if (data) {
        for (let i = 0; i < data.length; i++) {
          select.push(
            <option value={data[i].alpha3Code} key={data[i].alpha3Code} selected={data2 && data2.country == data[i].alpha3Code ? true : false}>
              {data[i].name}
            </option>
          );
        }
      }
      break;
    case "race":
      const races = ["Chinese", "Malay", "Indian", "Others"];
      if (data) {
        console.log(data);
      }
      races.map(race => {
        select.push(
          <option value={race} key={race} selected={data && data.race == race ? true : null}>
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
