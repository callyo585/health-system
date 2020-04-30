import Link from "next/link";
import Signout from "./signout";
import { toggleDropdown, toggleSignin, toggleSignup } from "./helper";

export default class Navbar extends React.Component {
  handleGetPath = (path) => {
    const { getPath } = this.props;
    getPath(path);
  };

  inSession = () => {
    return (
      <React.Fragment>
        <Link href="/profile">
          <a
            className="navbar-item"
            onClick={() => {
              this.handleGetPath("Profile");
            }}>
            Profile
          </a>
        </Link>
        <Link href="/dass21">
          <a
            className="navbar-item"
            onClick={() => {
              this.handleGetPath("Dass21");
            }}>
            Questionnaire
          </a>
        </Link>
        <Link href="/dotprobe">
          <a
            className="navbar-item"
            onClick={() => {
              this.handleGetPath("Dotprobe");
            }}>
            Game
          </a>
        </Link>
      </React.Fragment>
    );
  };

  render() {
    const { firebase, authUser } = this.props;

    return (
      <nav
        className="navbar is-info"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img src="./smiley128.png" width="30" height="28"></img>
            <h1 className="title has-text-white">HappyFaces</h1>
          </div>

          <a
            role="button"
            id="burger"
            className="navbar-burger burger "
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => {
              toggleDropdown();
            }}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {authUser &&
            authUser.email == "superadmin@superadmin.com" ? null : (
              <React.Fragment>
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
              </React.Fragment>
            )}

            {authUser && authUser.email != "superadmin@superadmin.com"
              ? this.inSession()
              : null}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {authUser ? null : (
                  <a className="button is-primary" onClick={toggleSignup}>
                    <strong>Sign up</strong>
                  </a>
                )}

                {authUser ? (
                  <Signout firebase={firebase} />
                ) : (
                  <a className="button is-light" onClick={toggleSignin}>
                    <strong>Sign in</strong>
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
