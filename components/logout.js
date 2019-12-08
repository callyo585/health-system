import Router from "next/router";

export default class Logout extends React.Component {
  handleLogout = firebase => {
    firebase
      .auth()
      .signOut()
      .then(response => {
        // Sign-out successful.
        console.log("user has logged out successfully");
        Router.push("/");
      })
      .catch(error => {
        // An error happened.
      });
  };

  render() {
    const { firebase, setAuthUser } = this.props;

    return (
      <a
        className="button is-light"
        onClick={() => {
          setAuthUser(null);
          this.handleLogout(firebase);
        }}>
        <strong>Logout</strong>
      </a>
    );
  }
}
