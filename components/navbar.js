import Link from "next/link";
import Router from "next/router";

Router.onRouteChangeStart = url => {
  console.log("url -->", url);
};

export default class Navbar extends React.Component {
  loginHandle = () => {
    document.getElementById("login").classList.add("is-active");
  };

  signupHandle = () => {
    document.getElementById("signup").classList.add("is-active");
  };

  handleGetPath = path => {
    const { getPath } = this.props;
    getPath(path);
  };

  render() {
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

            <Link href="/dotprobe">
              <a
                className="navbar-item"
                onClick={() => {
                  this.handleGetPath("Dotprobe");
                }}>
                Dot Probe Task
              </a>
            </Link>

            {/* <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider"></hr>
                <a className="navbar-item">Report an issue</a>
              </div>
            </div> */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary" onClick={this.signupHandle}>
                  <strong>Sign up</strong>
                </a>

                <a className="button is-light" onClick={this.loginHandle}>
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
