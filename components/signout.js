import Router from "next/router";

export default class Signout extends React.Component {
  handleSignout = firebase => {
    firebase
      .auth()
      .signOut()
      .then(response => {
        // Sign-out successful.
        console.log("user has logged out successfully");
        Router.push("/signout");
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
          this.handleSignout(firebase);
        }}>
        <strong>Sign out</strong>
      </a>
    );
  }
}
