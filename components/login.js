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
    console.log(userData);
    const login = {
      email: userData.email,
      password: userData.password
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(login.email, login.password)
      .then(response => {
        console.log("user has logged in");
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
              <button className="button is-info">Log in</button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}
