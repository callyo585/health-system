import Router from "next/router";
import { ButtonSectionNoLink } from "../components/section";
import happy1 from "../public/emojihappy1.png";
import happy2 from "../public/emojihappy2.png";
import happy3 from "../public/emojihappy3.png";
import happy4 from "../public/emojihappy4.png";
import happy5 from "../public/emojihappy5.png";
import neutral from "../public/emojineutral.png";
import sad1 from "../public/emojisad1.png";
import sad2 from "../public/emojisad2.png";
import sad3 from "../public/emojisad3.png";
import sad4 from "../public/emojisad4.png";
import sad5 from "../public/emojisad5.png";

const happyFaces = [happy1, happy2, happy3, happy4, happy5];

const nonHappyFaces = [neutral, sad1, sad2, sad3, sad4, sad5];

export default class DotProbe extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    resultTime: [],
    clickResults: [],
    currentSelect: 0,
    currentHappy: 0,
    currentNonHappy: 0,
    setCount: 0,
    reactionTime: [],
    email: null,
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
        this.setState({ email: authUser.email });
      }
    });
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 1);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  continueTimer = () => {
    const { timerTime, resultTime, setCount, email } = this.state;
    const { firebase, getPath } = this.props;
    let resultTimeSeconds = timerTime / 1000;
    const newResultTime = [...resultTime, resultTimeSeconds];
    this.setState({ resultTime: newResultTime, setCount: setCount + 1 }, () => {
      if (this.state.setCount == 120) {
        this.stopTimer();
        this.resetTimer();
        let reactionTime = [];
        newResultTime.map((result, index) => {
          if (index > 0) {
            reactionTime.push(
              parseFloat(
                (newResultTime[index] - newResultTime[index - 1]).toFixed(3)
              )
            );
          } else {
            reactionTime.push(parseFloat(result.toFixed(3)));
          }
        });

        const date = new Date();
        const currentTime =
          date.getDate().toString() +
          (date.getMonth() + 1).toString() +
          date.getFullYear().toString() +
          date.getHours().toString() +
          date.getMinutes().toString() +
          date.getSeconds().toString();
        const createdAt = date.toLocaleString();
        const totalTime = newResultTime[newResultTime.length - 1];

        let noOfCorrectClicks = 0;
        let totalCorrectTime = 0;
        this.state.clickResults.map((result, index) => {
          if (result) {
            noOfCorrectClicks++;
            totalCorrectTime += reactionTime[index];
          }
        });

        const gameResults = {
          resultId: currentTime,
          reactionTime: reactionTime,
          totalCorrect: noOfCorrectClicks,
          totalTime: totalTime,
          totalCorrectTime: totalCorrectTime,
          clickResults: this.state.clickResults,
          avgCorrectTime: (totalCorrectTime / 120).toFixed(3),
          createdAt: createdAt,
        };

        const gameResult = {
          latestGameResult: currentTime,
        };

        firebase
          .firestore()
          .collection("users")
          .doc(email)
          .set(gameResult, { merge: true });

        firebase
          .firestore()
          .collection("users")
          .doc(email)
          .collection("gameResults")
          .doc(currentTime)
          .set(gameResults, { merge: true })
          .then(() => {
            getPath("GameResult");
            Router.replace("/gameresult");
          });
      }
    });
  };

  onClickResult = (click) => {
    const { clickResults } = this.state;
    const newClickResults = [...clickResults, click];
    this.setState({ clickResults: newClickResults });
  };

  randomSelect = () => {
    const randomNum = Math.floor(Math.random() * 2);
    this.setState({ currentSelect: randomNum });
  };

  randomHappy = () => {
    const { currentHappy } = this.state;
    let randomNum = Math.floor(Math.random() * happyFaces.length);

    while (randomNum == currentHappy) {
      randomNum = Math.floor(Math.random() * happyFaces.length);
    }

    this.setState({
      currentHappy: randomNum,
    });
  };

  randomNonHappy = () => {
    const { currentNonHappy } = this.state;
    let randomNum = Math.floor(Math.random() * nonHappyFaces.length);

    while (randomNum == currentNonHappy) {
      randomNum = Math.floor(Math.random() * nonHappyFaces.length);
    }

    this.setState({
      currentNonHappy: randomNum,
    });
  };

  render() {
    const {
      timerOn,
      currentSelect,
      setCount,
      currentHappy,
      currentNonHappy,
    } = this.state;
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">HappyFaces Game</h1>
            {!timerOn ? (
              <React.Fragment>
                <h2 className="subtitle">
                  The purpose of this game is to click on the happy faces from a
                  selection of 2 faces.
                </h2>
                <h2 className="subtitle">
                  The happy faces you should click on:
                </h2>
                <h2 className="subtitle">
                  <table>
                    <tbody>
                      <tr>
                        {happyFaces.map((face) => {
                          return (
                            <td key={`${face}`}>
                              <figure className="image is-128x128">
                                <img className="is-rounded" src={`${face}`} />
                              </figure>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </h2>
                <ButtonSectionNoLink
                  title="Press this button to start the game"
                  button="Start"
                  onClick={this.startTimer}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2 className="subtitle">
                  Completed:{" "}
                  <progress
                    className="progress is-primary"
                    value={setCount}
                    max="120"
                  />
                </h2>
                <figure className="image">
                  <img
                    src={
                      currentSelect == 0
                        ? `${happyFaces[currentHappy]}`
                        : `${nonHappyFaces[currentNonHappy]}`
                    }
                    name="image1"
                    style={{
                      width: "256px",
                      height: "256px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onClick={() => {
                      this.randomSelect();
                      this.randomHappy();
                      this.randomNonHappy();
                      currentSelect == 0
                        ? this.onClickResult(true)
                        : this.onClickResult(false);
                      this.continueTimer();
                    }}
                  />
                </figure>
                <figure className="image">
                  <img
                    src={
                      currentSelect == 0
                        ? `${nonHappyFaces[currentNonHappy]}`
                        : `${happyFaces[currentHappy]}`
                    }
                    name="image2"
                    style={{
                      width: "256px",
                      height: "256px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onClick={() => {
                      this.randomSelect();
                      this.randomHappy();
                      this.randomNonHappy();
                      currentSelect == 0
                        ? this.onClickResult(false)
                        : this.onClickResult(true);
                      this.continueTimer();
                    }}
                  />
                </figure>
                <ButtonSectionNoLink
                  title="Press this button to end the game"
                  button="End"
                  onClick={this.stopTimer}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </section>
    );
  }
}
