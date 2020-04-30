import Router from "next/router";
import { ButtonSection } from "../components/section";

export default class Dass21Results extends React.Component {
  state = {
    anxiety: 0,
    depression: 0,
    stress: 0,
    anxietyRange: "",
    depressionRange: "",
    stressRange: "",
  };

  componentDidMount() {
    const { firebase, getPath } = this.props;
    firebase.auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        getPath("/");
        Router.replace("/");
      } else {
        this.setState({ loading: true });
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then((authUser) => {
            firebase
              .firestore()
              .collection("dass21")
              .doc("range")
              .get()
              .then((range) => {
                this.setState({
                  gender: !!authUser.data().gender
                    ? authUser.data().gender
                    : "",
                  username: !!authUser.data().username
                    ? authUser.data().username
                    : "",
                  email: !!authUser.data().email ? authUser.data().email : "",
                  age: !!authUser.data().age ? authUser.data().age : 0,
                  country: !!authUser.data().country
                    ? authUser.data().country
                    : "",
                  race: !!authUser.data().race ? authUser.data().race : "",
                  height: !!authUser.data().height
                    ? authUser.data().height
                    : "",
                  weight: !!authUser.data().weight
                    ? authUser.data().weight
                    : "",
                  illness: !!authUser.data().illness
                    ? authUser.data().illness
                    : "",
                  anxiety: !!authUser.data().anxiety
                    ? authUser.data().anxiety
                    : "",
                  anxietyRange: !!authUser.data().anxiety
                    ? range.data().anxiety[authUser.data().anxiety]
                    : "",
                  depression: !!authUser.data().depression
                    ? authUser.data().depression
                    : "",
                  depressionRange: !!authUser.data().anxiety
                    ? range.data().depression[authUser.data().depression]
                    : "",
                  stress: !!authUser.data().stress
                    ? authUser.data().stress
                    : "",
                  stressRange: !!authUser.data().anxiety
                    ? range.data().stress[authUser.data().stress]
                    : "",
                  loading: false,
                });
              });
          });
      }
    });
  }

  render() {
    const {
      anxiety,
      depression,
      stress,
      anxietyRange,
      depressionRange,
      stressRange,
      loading,
    } = this.state;
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Results</h1>
            <h2 className="subtitle">
              The results for the questions you have answered are as follows:
            </h2>
            <h2 className="subtitle">
              Anxiety: {!loading ? anxietyRange : "loading..."} (
              {!loading ? anxiety : ""})
            </h2>
            <h2 className="subtitle">
              Depression: {!loading ? depressionRange : "loading..."} (
              {!loading ? depression : ""})
            </h2>
            <h2 className="subtitle">
              Stress: {!loading ? stressRange : "loading..."} (
              {!loading ? stress : ""})
            </h2>
          </div>

          <ButtonSection
            title="You may now check out our game that might be able to help you improve your mood"
            button="Proceed to Game"
            href="/dotprobe"
          />
        </div>
      </section>
    );
  }
}
