import Error from "../pages/_error";
import fetch from "isomorphic-unfetch";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: null,
      statusCountries: null,
      gender: "",
      username: "",
      email: "",
      age: null,
      country: "",
      race: "",
      height: null,
      weight: null,
      illness: "",
      password: "",
      confirmPass: "",
      error: ""
    };
  }

  async componentDidMount() {
    const response = await fetch("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;");
    const getCountriesStatus = response.status > 200 ? response.status : false;
    const getCountries = await response.json();

    this.setState({
      countries: getCountries,
      statusCountries: getCountriesStatus
    });
  }

  closeSignup = () => {
    document.getElementById("signup").classList.remove("is-active");
  };

  renderDropdown = (category, data) => {
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

  handleSubmit = event => {
    event.preventDefault();

    const { firebase } = this.props;
    const userData = this.state;
    const signUp = {
      username: userData.username,
      email: userData.email,
      age: userData.age,
      gender: userData.gender,
      country: userData.country,
      race: userData.race,
      height: userData.height,
      weight: userData.weight,
      illness: userData.illness,
      password: userData.password,
      confirmPass: userData.confirmPass
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(signUp.email, signUp.password)
      .then(response => {
        firebase
          .firestore()
          .collection("users")
          .doc()
          .set(signUp);
        console.log("user created successfully");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Status ", errorCode, " : ", errorMessage);
        // ...
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { countries, statusCountries } = this.state;

    return (
      <div className="modal" id="signup">
        <div className="modal-background" onClick={this.closeSignup}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Register</p>
            <button className="delete" aria-label="close" onClick={this.closeSignup}></button>
          </header>
          <form onSubmit={this.handleSubmit}>
            <section className="modal-card-body">
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Username<span className="red">*</span> :
                </div>
                <div className="column">
                  <input className="input is-info" type="text" placeholder="e.g. example" name="username" onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Email<span className="red">*</span> :
                </div>
                <div className="column">
                  <input className="input is-info" type="text" placeholder="e.g. example@example.com" name="email" onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Age<span className="red">*</span> :
                </div>
                <div className="column">
                  <div className="control">
                    <div className="select is-info">
                      <select name="age" onChange={this.handleChange}>
                        <option value="notSelected">Select Age</option>
                        {this.renderDropdown("age")}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Gender<span className="red">*</span> :
                </div>
                <div className="column">
                  <div className="control">
                    <label className="radio">
                      <input type="radio" name="gender" value="M" onChange={this.handleChange} />
                      Male
                    </label>
                    <label className="radio">
                      <input type="radio" name="gender" value="F" onChange={this.handleChange} />
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Country<span className="red">*</span> :
                </div>
                <div className="column">
                  <div className="control">
                    <div className="select is-info">
                      <select name="country" onChange={this.handleChange}>
                        <option value="notSelected">Select Country</option>
                        {this.renderDropdown("country", countries)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Race<span className="red">*</span> :
                </div>
                <div className="column">
                  <div className="control">
                    <div className="select is-info">
                      <select name="race" onChange={this.handleChange}>
                        <option value="notSelected">Select Race</option>
                        {this.renderDropdown("race")}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Height<span className="red">*</span> :
                </div>
                <div className="column is-one-fourth">
                  <input className="input is-info" type="number" placeholder="in cm(e.g. 160.1)" name="height" onChange={this.handleChange}></input>
                </div>
                <div className="column is-one-fifth">
                  Weight<span className="red">*</span> :
                </div>
                <div className="column is-one-fourth">
                  <input className="input is-info" type="number" placeholder="in kg(e.g. 80.6)" name="weight" onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">Illness:</div>
                <div className="column">
                  <input className="input is-info" type="text" placeholder="Physical and Mental(if any) e.g. Diabetes" name="illness" onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Password<span className="red">*</span> :
                </div>
                <div className="column">
                  <input className="input is-info" type="password" placeholder="password" name="password" onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">
                  Confirm Password<span className="red">*</span> :
                </div>
                <div className="column">
                  <input className="input is-info" type="password" placeholder="confirm password" name="confirmPass" onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column">By signing up, you agree to allow your personal information be collected for depression data analysis.</div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-info">
                Sign up
              </button>{" "}
              {this.state.error}
            </footer>
          </form>
        </div>
        <style jsx>
          {`
            .red {
              color: red;
            }
          `}
        </style>
      </div>
    );
  }
}
