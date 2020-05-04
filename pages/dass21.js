import Router from "next/router";
import { toggleButton } from "../components/helper";

export default class Dass21 extends React.Component {
  state = {
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
    score: null,
    answers: [],
    totalScores: [],
  };

  componentDidMount() {
    const { getCountries, getCountriesStatus, firebase, getPath } = this.props;

    firebase
      .firestore()
      .collection("dass21")
      .doc("dass21")
      .get()
      .then((dass) => {
        this.setState({
          questions: dass.data().questions,
          score: dass.data().score,
        });
      });

    firebase
      .firestore()
      .collection("dass21")
      .doc("calculationSet")
      .get()
      .then((calculationSet) => {
        this.setState({ calculationSet: calculationSet.data() });
      });

    firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        getPath("Home");
        Router.replace("/");
      } else {
        this.setState({ loading: true });
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then((authUser) => {
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
              loading: false,
            });
          });
      }
    });
  }

  handleChange = (event) => {
    let answers = [...this.state.answers];
    let answer = event.target.value;
    answers.push(answer);
    this.setState({ answers });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { answers, calculationSet } = this.state;
    const { firebase, getPath } = this.props;
    let anxiety = 0;
    let depression = 0;
    let stress = 0;
    if (answers.length < 21) {
      this.setState({ error: "Please answer all the questions provided." });
    } else {
      answers.forEach((answer, index) => {
        calculationSet.anxiety.forEach((question) => {
          if (index + 1 == question) {
            anxiety += parseInt(answer);
          }
        });

        calculationSet.depression.forEach((question) => {
          if (index + 1 == question) {
            depression += parseInt(answer);
          }
        });

        calculationSet.stress.forEach((question) => {
          if (index + 1 == question) {
            stress += parseInt(answer);
          }
        });
      });

      let totalScores = {
        anxiety: anxiety * 2,
        depression: depression * 2,
        stress: stress * 2,
      };
      this.setState({ totalScores: totalScores, error: "" });

      toggleButton("dass21");

      firebase
        .firestore()
        .collection("users")
        .doc(this.state.email)
        .set(totalScores, { merge: true })
        .then(() => {
          toggleButton("dass21");
          getPath("Dass21Results");
          Router.replace("/dass21results");
        });
    }
  };

  render() {
    const { questions, score, error } = this.state;

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
                        ? score.map((option) => {
                            return <th key={option}>{option}</th>;
                          })
                        : null}
                    </tr>
                  </thead>
                  <tbody>
                    {questions
                      ? questions.map((question, index) => {
                          return (
                            <tr key={question}>
                              <th>{index + 1}</th>
                              <td>{question}</td>
                              {score.map((option, score) => {
                                return (
                                  <td
                                    style={{ textAlign: "center" }}
                                    key={option}>
                                    <label>
                                      <input
                                        type="radio"
                                        name={index + 1}
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
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link" id="dass21Button">
                      Submit
                    </button>
                  </div>
                  <div className="column has-text-danger incorrect">
                    {error}
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
