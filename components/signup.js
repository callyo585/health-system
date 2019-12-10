import Error from "../pages/_error";
import fetch from "isomorphic-unfetch";
import Form from "./form";
import Router from "next/router";
import { toggleSignup, toggleButton } from "./helper";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      statusCountries: null,
      gender: "",
      username: "",
      email: "",
      age: "",
      country: "",
      race: "",
      height: "",
      weight: "",
      illness: "",
      password: "",
      confirmPass: "",
      signup: true,
      profile: false,
      valid: true,
      error: null
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

  // validateSignup = signUp => {
  //   const usernameRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  //   const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (signUp.username != usernameRegex) {
  //     this.setState({ valid: false, error: "Username is invalid" });
  //   }
  // };

  handleSubmit = event => {
    event.preventDefault();

    const { firebase } = this.props;
    const userData = this.state;
    const signUp = {
      username: userData.username,
      email: userData.email,
      age: parseInt(userData.age),
      gender: userData.gender,
      country: userData.country,
      race: userData.race,
      height: parseInt(userData.height),
      weight: parseInt(userData.weight),
      illness: userData.illness,
      password: userData.password,
      confirmPass: userData.confirmPass
    };

    toggleButton();

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
        this.setState({
          gender: "",
          username: "",
          email: "",
          age: "",
          country: "",
          race: "",
          height: "",
          weight: "",
          illness: "",
          password: "",
          confirmPass: ""
        });

        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(async () => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            const response = await firebase
              .auth()
              .signInWithEmailAndPassword(signUp.email, signUp.password)
              .then(response => {
                console.log("user has logged in successfully");
              });
            return response;
          });

        toggleSignup();
        Router.push("/profile");
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
    const { countries, statusCountries, error, profile, signup, gender, username, email, age, country, race, height, weight, illness, password, confirmPass } = this.state;

    const signupDetails = {
      gender,
      username,
      email,
      age,
      country,
      race,
      height,
      weight,
      illness,
      password,
      confirmPass
    };
    console.log("check signupDetails", signupDetails);

    return (
      <div className="modal" id="signup">
        <div className="modal-background" onClick={toggleSignup}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Signup</p>
            <button className="delete" aria-label="close" onClick={toggleSignup}></button>
          </header>
          <Form countries={countries} handleChange={this.handleChange} handleSubmit={this.handleSubmit} error={error} profile={profile} signup={signup} signupDetails={signupDetails} />
        </div>
      </div>
    );
  }
}
