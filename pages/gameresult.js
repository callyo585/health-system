import Router from "next/router";
import { ButtonSection } from "../components/section";

export default class GameResult extends React.Component {
  state = {
    totalCorrect: null,
    totalTime: null,
  };

  componentDidMount() {
    const { firebase, getPath } = this.props;

    firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        getPath("Home");
        Router.replace("/");
      } else if (!authUser.emailVerified) {
        getPath("Verification");
        Router.replace("/verification");
      } else {
        this.setState({ loading: true });
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then((authUser) => {
            if (
              !authUser.data().anxiety ||
              !authUser.data().depression ||
              !authUser.data().stress
            ) {
              getPath("Dass21");
              Router.replace("/dass21");
            } else {
              firebase
                .firestore()
                .collection("users")
                .doc(authUser.data().email)
                .get()
                .then((user) => {
                  this.setState({
                    loading: false,
                    latestGameResult: !!user.data().latestGameResult
                      ? user.data().latestGameResult
                      : "",
                  });

                  if (!!user.data().latestGameResult) {
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(user.data().email)
                      .collection("gameResults")
                      .doc(user.data().latestGameResult)
                      .get()
                      .then((result) => {
                        this.setState({
                          totalCorrect: !!result.data().totalCorrect
                            ? result.data().totalCorrect
                            : null,
                          totalTime: !!result.data().totalTime
                            ? result.data().totalTime
                            : null,
                        });
                      });
                  }
                });
            }
          });
      }
    });
  }

  correctClickPercentage = () => {
    return ((this.state.totalCorrect / 120) * 100).toFixed(2);
  };

  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Game Result:</h1>
            <h2 className="subtitle">
              Total Correct Faces Clicked:{" "}
              {!this.state.loading
                ? this.state.totalCorrect +
                  " / 120 (" +
                  this.correctClickPercentage() +
                  "%)"
                : "loading..."}
            </h2>
            <h2 className="subtitle">
              Total Time Taken:{" "}
              {!this.state.loading ? this.state.totalTime + "s" : "loading..."}
            </h2>

            <ButtonSection
              title="Having fun and want to play again?"
              href="/dotprobe"
              button="Play Again"></ButtonSection>
          </div>
        </div>
      </section>
    );
  }
}
