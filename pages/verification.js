import { ButtonSection } from "../components/section";
import Router from "next/router";
import { toggleButton } from "../components/helper";

export default class Verification extends React.Component {
  state = {
    sent: false,
  };
  componentDidMount() {
    const { firebase, getPath } = this.props;
    firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        getPath("Home");
        Router.replace("/");
      }
    });
  }

  sendVerificationEmail = () => {
    const { firebase } = this.props;
    const user = firebase.auth().currentUser;

    user
      .sendEmailVerification()
      .then(() => {
        // Email sent.
        console.log("Verification Email has been sent");
        toggleButton("verification");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error: ", error);
      });
  };

  render() {
    console.log(this.props);
    return (
      <ButtonSection
        title="Please verify your email, and your sign up will be completed. (Check spam/junk mail if unable to find email)"
        button={
          !this.state.sent
            ? "Send Verification Email"
            : "Resend Verification Email"
        }
        onClick={() => {
          toggleButton("verification");
          this.sendVerificationEmail();
        }}
        href={{ href: "" }}
      />
    );
  }
}
