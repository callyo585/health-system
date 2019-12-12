import Router from "next/router";

export default class Signout extends React.Component {
  handleSignout = () => {
    const { firebase } = this.props;

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
    return (
      <a className="button is-light" onClick={this.handleSignout}>
        <strong>Sign out</strong>
      </a>
    );
  }
}