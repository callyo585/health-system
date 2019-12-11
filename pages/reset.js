import Form from "../components/basicuserform";
import { Section } from "../components/section";
import { toggleButton } from "../components/helper";

export default class Reset extends React.Component {
  state = {
    reset: "container box",
    display: "none",
    email: "",
    resetMsg: "",
    resetColor: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    const { firebase } = this.props;
    const { email } = this.state;

    toggleButton("reset");

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Email sent.
        console.log("Password reset email is sent successfully");
        toggleButton("reset");
        this.setState({
          resetMsg: "A password reset email has been sent to your email, please follow the instructions to reset your password. If you are unable to find the email, please try checking your spam/junk folder or try sending another password reset email",
          resetColor: " has-text-link"
        });
      })
      .catch(error => {
        // An error happened.
        const errorCode = error.code;
        console.log("Password reset email is not sent successfully", error);
        toggleButton("reset");
        if (errorCode.includes("invalid")) {
          this.setState({ resetMsg: "Incorrect email, please provide a correct email address", resetColor: " has-text-danger" });
        }
        if (errorCode.includes("user-not-found")) {
          this.setState({ resetMsg: "The provided email is not registered in our system", resetColor: " has-text-danger" });
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { reset, display, resetMsg, resetColor } = this.state;
    return (
      <React.Fragment>
        <Section title="Password Reset" subtitle="Please enter your Email Address" />
        <Form reset={reset} display={display} resetMsg={resetMsg} resetColor={resetColor} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </React.Fragment>
    );
  }
}
