import Form from "../components/userform";
import Router from "next/router";
import { validateInput, toggleButton } from "../components/helper";

export default class Profile extends React.Component {
  state = {
    authUser: null,
    msgColor: "",
    countries: [],
    statusCountries: null,
    gender: "",
    username: "",
    email: "",
    age: 0,
    country: "",
    race: "",
    height: "",
    weight: "",
    illness: "",
    profile: true,
    signup: false,
    loading: true,
    message: "",
    questions: null,
    calculationSet: null,
    score: null
  };

  componentDidMount() {
    const { getCountries, getCountriesStatus, firebase } = this.props;

    firebase
      .firestore()
      .collection("dass21")
      .doc("dass21")
      .get()
      .then(dass => {
        this.setState({
          questions: dass.data().questions,
          score: dass.data().score
        });
      });

    firebase
      .firestore()
      .collection("dass21")
      .doc("calculationSet")
      .get()
      .then(calculationSet => {
        this.setState({ calculationSet: calculationSet.data() });
      });

    firebase.auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        Router.replace("/");
      } else {
        this.setState({ loading: true });
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then(authUser => {
            this.setState({
              countries: getCountries,
              statusCountries: getCountriesStatus,
              gender: !!authUser.data().gender ? authUser.data().gender : "",
              username: !!authUser.data().username
                ? authUser.data().username
                : "",
              email: !!authUser.data().email ? authUser.data().email : "",
              age: !!authUser.data().age ? authUser.data().age : 0,
              country: !!authUser.data().country ? authUser.data().country : "",
              race: !!authUser.data().race ? authUser.data().race : "",
              height: !!authUser.data().height ? authUser.data().height : "",
              weight: !!authUser.data().weight ? authUser.data().weight : "",
              illness: !!authUser.data().illness ? authUser.data().illness : "",
              loading: false
            });
          });
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    toggleButton("update");
    this.setState({ message: "" });

    const { firebase } = this.props;
    const userData = this.state;
    const update = {
      username: userData.username,
      email: userData.email,
      age: userData.age,
      gender: userData.gender,
      country: userData.country,
      race: userData.race,
      height: userData.height,
      weight: userData.weight,
      illness: userData.illness
    };

    if (validateInput(update, "profile")) {
      this.setState({
        message: validateInput(update, "profile"),
        msgColor: "has-text-danger"
      });
      toggleButton("update");
      return false;
    }

    firebase
      .firestore()
      .collection("users")
      .doc(update.email)
      .set(update)
      .then(() => {
        console.log("user updated successfully");
        this.setState({
          message: "User Profile has been updated successfully",
          msgColor: "has-text-link"
        });
        toggleButton("update");
      })
      .catch(error => {
        console.log("user is not updated successfully");
        toggleButton("update");
        console.log(error.code, " : ", error.message);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // toggleButton("dass21");
  };

  render() {
    const { questions, calculationSet, score } = this.state;
    console.log("state --->", this.state);
    console.log("questions --->", questions);
    console.log("calculationSet --->", calculationSet);
    console.log("score --->", score);

    return (
      <div>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="subtitle">
                We hope that you can answer the questions we have prepared below
                so we can better undestand how do you feel:
              </h1>
              <form onSubmit={this.handleSubmit}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Question</th>
                      {score
                        ? score.map(option => {
                            return <th>{option}</th>;
                          })
                        : null}
                    </tr>
                  </thead>
                  <tbody>
                    {questions
                      ? questions.map((question, index) => {
                          return (
                            <tr>
                              <th>{index + 1}</th>
                              <td>{question}</td>
                              {score.map((option, score) => {
                                return (
                                  <td style={{ textAlign: "center" }}>
                                    <label>
                                      <input
                                        type="radio"
                                        name={`answer${index}`}
                                        value={score}
                                        onChange={this.handleChange}
                                      />
                                    </label>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })
                      : "loading..."}
                  </tbody>
                </table>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" id="dass21Button">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
