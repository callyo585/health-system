import Error from "../pages/_error";
import fetch from "isomorphic-unfetch";
import Form from "./userform";
import Router from "next/router";
import { toggleSignup, toggleButton, validateInput } from "./helper";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      statusCountries: null,
      gender: "",
      username: "",
      email: "",
      age: 0,
      country: "",
      race: "",
      height: "",
      weight: "",
      illness: "",
      password: "",
      confirmPass: "",
      signup: true,
      profile: false,
      message: "",
      msgColor: ""
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

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ message: "" });
    toggleButton("signup");

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

    if (validateInput(signUp, "signup")) {
      this.setState({ message: validateInput(signUp, "signup"), msgColor: "has-text-danger" });
      toggleButton("signup");
      return false;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(signUp.email, signUp.password)
      .then(response => {
        console.log("user created successfully");
        firebase
          .firestore()
          .collection("users")
          .doc(signUp.email)
          .set(signUp);
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
        toggleButton("signup");
        Router.push("/verification");
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        let message = "";
        console.error("Status ", errorCode, " : ", errorMessage);
        if (errorCode.includes("email-already-in-use")) {
          message = "Email is already registered in our system";
        }
        toggleButton("signup");
        this.setState({ message: message, msgColor: "has-text-danger" });
        // ...
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { countries, statusCountries, message, profile, signup, gender, username, email, age, country, race, height, weight, illness, password, confirmPass, valid, msgColor } = this.state;

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

    return (
      <div className="modal" id="signup">
        <div className="modal-background" onClick={toggleSignup}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sign Up</p>
            <button className="delete" aria-label="close" onClick={toggleSignup}></button>
          </header>
          <Form countries={countries} handleChange={this.handleChange} handleSubmit={this.handleSubmit} profile={profile} signup={signup} signupDetails={signupDetails} message={message} msgColor={msgColor} />
        </div>
      </div>
    );
  }
}
