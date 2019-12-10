import Router from "next/router";

export default class Logout extends React.Component {
  handleLogout = firebase => {
    firebase
      .auth()
      .signOut()
      .then(response => {
        // Sign-out successful.
        console.log("user has logged out successfully");
        Router.push("/logout");
      })
      .catch(error => {
        // An error happened.
      });
  };

  render() {
    const { firebase } = this.props;

    return (
      <a
        className="button is-light"
        onClick={() => {
          this.handleLogout(firebase);
        }}>
        <strong>Logout</strong>
      </a>
    );
  }
}
