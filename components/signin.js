import Form from "./basicuserform";
import Router from "next/router";
import { toggleSignin, toggleButton } from "./helper";

export default class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    signin: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: "" });

    const { firebase, getPath } = this.props;
    const userData = this.state;
    const signin = {
      email: userData.email,
      password: userData.password,
    };

    toggleButton("signin");
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        await firebase
          .auth()
          .signInWithEmailAndPassword(signin.email, signin.password)
          .then((response) => {
            console.log("user has logged in successfully");
            toggleSignin();
            toggleButton("signin");
            this.setState({ email: "", password: "" });
          });

        if (signin.email == "superadmin@superadmin.com") {
          getPath("Admin");
          Router.replace("/admin");
        } else {
          getPath("Profile");
          Router.replace("/profile");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        let errorMessage = null;
        if (error.code.includes("email")) {
          errorMessage = "Incorrect email!";
        }

        if (error.code.includes("password")) {
          errorMessage = "Incorrect password!";
        }

        if (error.code.includes("user-not-found")) {
          errorMessage = "Email is not registered in our system!";
        }

        const originalError = error.code + " : " + error.message;
        console.log(originalError);

        toggleButton("signin");
        this.setState({ error: errorMessage });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { error, email, password, signin } = this.state;
    return (
      <div className="modal" id="basicForm">
        <div className="modal-background" onClick={toggleSignin}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sign in</p>
            <button
              className="delete"
              aria-label="close"
              onClick={toggleSignin}></button>
          </header>
          <Form
            error={error}
            email={email}
            password={password}
            signin={signin}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            toggleSignin={toggleSignin}
          />
        </div>
      </div>
    );
  }
}
