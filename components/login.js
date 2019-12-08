import Router from "next/router";

export default class Login extends React.Component {
  state = {
    incorrect: false,
    email: "",
    password: "",
    error: null
  };

  closeLogin = () => {
    document.getElementById("login").classList.remove("is-active");
  };

  handleSubmit = event => {
    event.preventDefault();

    const { firebase, setAuthUser } = this.props;
    const userData = this.state;
    const login = {
      email: userData.email,
      password: userData.password
    };

    document.getElementById("button").classList.add("is-loading");

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(async () => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(login.email, login.password)
          .then(response => {
            console.log("user has logged in successfully");
            document.getElementById("login").classList.remove("is-active");
            document.getElementById("button").classList.remove("is-loading");
            this.setState({ email: "", password: "" });
            firebase.auth().onAuthStateChanged(authUser => {
              if (authUser) {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(authUser.email)
                  .get()
                  .then(authUser => {
                    setAuthUser(authUser);
                  });
              }
            });
            Router.push("/profile");
          });
        return response;
      })
      .catch(error => {
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

        document.getElementById("button").classList.remove("is-loading");
        this.setState({ incorrect: true, error: errorMessage });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { incorrect, error, email, password } = this.state;
    return (
      <div className="modal" id="login">
        <div className="modal-background" onClick={this.closeLogin}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Login</p>
            <button className="delete" aria-label="close" onClick={this.closeLogin}></button>
          </header>
          <form onSubmit={this.handleSubmit}>
            <section className="modal-card-body">
              <div className="columns is-mobile">
                <div className="column is-one-fifth">User Email: </div>
                <div className="column">
                  <input className="input is-info" type="text" placeholder="e.g. example@example.com" name="email" onChange={this.handleChange} value={email}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">Password: </div>
                <div className="column">
                  <input className="input is-info" type="password" placeholder="password" name="password" onChange={this.handleChange} value={password}></input>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button id="button" className="button is-info">
                Log in
              </button>
              {incorrect ? <div className="column has-text-danger incorrect"> {error} </div> : null}
            </footer>
          </form>
        </div>
      </div>
    );
  }
}
