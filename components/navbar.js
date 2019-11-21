import Link from "next/link";
import Logout from "./logout";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  loginHandle = () => {
    document.getElementById("login").classList.add("is-active");
  };

  logout = () => {
    this.setState({ authUser: null });
  };

  signupHandle = () => {
    document.getElementById("signup").classList.add("is-active");
  };

  handleGetPath = path => {
    const { getPath } = this.props;
    getPath(path);
  };

  componentDidMount() {
    const { firebase } = this.props;

    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then(user => {
            this.setState({ authUser: user.data() });
          });
      }
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;

    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then(user => {
            this.setState({ authUser: user.data() });
          });
      }
    });
  }

  buttonState = () => {
    document.getElementById("signupButton").classList.remove("is-loading");
    document.getElementById("loginButton").classList.remove("is-loading");
  };

  render() {
    const { authUser } = this.state;
    const { firebase } = this.props;

    return (
      <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img src="./smiley128.png" width="30" height="28"></img>
            <h1 className="title has-text-white">HappyFaces</h1>
          </div>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/">
              <a
                className="navbar-item"
                onClick={() => {
                  this.handleGetPath("Home");
                }}>
                Home
              </a>
            </Link>

            <Link href="/about">
              <a
                className="navbar-item"
                onClick={() => {
                  this.handleGetPath("About");
                }}>
                About Us
              </a>
            </Link>

            {authUser ? (
              <Link href="/dotprobe">
                <a
                  className="navbar-item"
                  onClick={() => {
                    this.handleGetPath("Dotprobe");
                  }}>
                  Game
                </a>
              </Link>
            ) : null}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a id="signupButton" className="button is-primary" onClick={this.signupHandle}>
                  <strong>Sign up</strong>
                </a>

                {authUser ? (
                  <Logout firebase={firebase} logout={this.logout} />
                ) : (
                  <a id="loginButton" className="button is-light" onClick={this.loginHandle}>
                    <strong>Log in</strong>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
