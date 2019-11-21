import Router from "next/router";

export default class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  closeLogin = () => {
    document.getElementById("login").classList.remove("is-active");
  };

  handleSubmit = event => {
    event.preventDefault();

    const { firebase } = this.props;
    const userData = this.state;
    const login = {
      email: userData.email,
      password: userData.password
    };

    document.getElementById("button").classList.add("is-loading");
    document.getElementById("loginButton").classList.add("is-loading");

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
            Router.push("/dotprobe");
          });
        return response;
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Status ", errorCode, " : ", errorMessage);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
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
                  <input className="input is-info" type="text" placeholder="e.g. example@example.com" name="email" onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">Password: </div>
                <div className="column">
                  <input className="input is-info" type="password" placeholder="password" name="password" onChange={this.handleChange}></input>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button id="button" className="button is-info">
                Log in
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}
