import Error from "../pages/_error";
import fetch from "isomorphic-unfetch";
import Form from "./form";

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
      error: "",
      signup: true,
      profile: false
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

  async componentWillUnmount() {
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
          .doc(signUp.email)
          .set(signUp);
        console.log("user created successfully");
      })
      .catch(error => {
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
    const { countries, statusCountries, error, profile, signup } = this.state;

    return (
      <div className="modal" id="signup">
        <div className="modal-background" onClick={this.closeSignup}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Register</p>
            <button className="delete" aria-label="close" onClick={this.closeSignup}></button>
          </header>
          <Form countries={countries} handleChange={this.handleChange} handleSubmit={this.handleSubmit} error={error} profile={profile} signup={signup} />
        </div>
      </div>
    );
  }
}
