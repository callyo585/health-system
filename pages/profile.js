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
    anxiety: "",
    depression: "",
    stress: "",
    profile: true,
    signup: false,
    loading: true,
    message: "",
  };

  static async getInitialProps() {
    const response = await fetch(
      "https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;"
    );
    const getCountriesStatus = response.status > 200 ? response.status : false;
    const getCountries = await response.json();

    return { getCountries, getCountriesStatus };
  }

  componentDidMount() {
    const { getCountries, getCountriesStatus, firebase, getPath } = this.props;

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
                .collection("dass21")
                .doc("range")
                .get()
                .then((range) => {
                  this.setState({
                    countries: getCountries,
                    statusCountries: getCountriesStatus,
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
                      ? range.data().anxiety[
                          authUser.data().anxiety <= range.data().anxiety.length
                            ? authUser.data().anxiety
                            : range.data().anxiety.length - 1
                        ]
                      : "",
                    depression: !!authUser.data().depression
                      ? range.data().depression[
                          authUser.data().depression <=
                          range.data().depression.length
                            ? authUser.data().depression
                            : range.data().depression.length - 1
                        ]
                      : "",
                    stress: !!authUser.data().stress
                      ? range.data().stress[
                          authUser.data().stress <= range.data().stress.length
                            ? authUser.data().stress
                            : range.data().stress.length - 1
                        ]
                      : "",
                    loading: false,
                  });
                });
            }
          });
      }
    });
  }

  handleSubmit = (event) => {
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
      illness: userData.illness,
    };

    if (validateInput(update, "profile")) {
      this.setState({
        message: validateInput(update, "profile"),
        msgColor: "has-text-danger",
      });
      toggleButton("update");
      return false;
    }

    firebase
      .firestore()
      .collection("users")
      .doc(update.email)
      .set(update, { merge: true })
      .then(() => {
        console.log("user updated successfully");
        this.setState({
          message: "User Profile has been updated successfully",
          msgColor: "has-text-link",
        });
        toggleButton("update");
      })
      .catch((error) => {
        console.log("user is not updated successfully");
        toggleButton("update");
        console.log(error.code, " : ", error.message);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      countries,
      profile,
      signup,
      gender,
      username,
      email,
      age,
      country,
      race,
      height,
      weight,
      illness,
      anxiety,
      depression,
      stress,
      loading,
      message,
      msgColor,
    } = this.state;
    const { authUser } = this.props;

    const profileData = {
      gender,
      username,
      email,
      age,
      country,
      race,
      height,
      weight,
      illness,
      anxiety,
      depression,
      stress,
    };

    return (
      <React.Fragment>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <article className="panel is-link">
                <p className="panel-heading">Profile Info</p>
                <Form
                  profile={profile}
                  signup={signup}
                  countries={countries}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  profileData={profileData}
                  loading={loading}
                  authUser={authUser}
                  message={message}
                  msgColor={msgColor}
                />
              </article>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
