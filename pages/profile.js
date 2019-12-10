import Form from "../components/form";
import Router from "next/router";

export default class Profile extends React.Component {
  state = {
    authUser: null,
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
    loading: true
  };

  static async getInitialProps() {
    const response = await fetch("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;");
    const getCountriesStatus = response.status > 200 ? response.status : false;
    const getCountries = await response.json();

    return { getCountries, getCountriesStatus };
  }

  componentDidMount() {
    const { getCountries, getCountriesStatus, firebase } = this.props;

    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ loading: true, authUser: authUser });
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then(authUser => {
            this.setState({
              countries: getCountries,
              statusCountries: getCountriesStatus,
              gender: authUser.data().gender,
              username: authUser.data().username,
              email: authUser.data().email,
              age: authUser.data().age,
              country: authUser.data().country,
              race: authUser.data().race,
              height: authUser.data().height,
              weight: authUser.data().weight,
              illness: authUser.data().illness,
              loading: false
            });
          });
      } else {
        Router.push("/");
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();

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
      password: userData.password,
      confirmPass: userData.confirmPass
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(update.email, update.password)
      .then(response => {
        firebase
          .firestore()
          .collection("users")
          .doc(update.email)
          .set(update);
        console.log("user updated successfully");
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Status ", errorCode, " : ", errorMessage);
        // ...
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { countries, profile, signup, gender, username, email, age, country, race, height, weight, illness, loading, authUser } = this.state;

    const profileData = {
      gender,
      username,
      email,
      age,
      country,
      race,
      height,
      weight,
      illness
    };

    return (
      <React.Fragment>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <article className="panel is-link">
                <p className="panel-heading">Profile Info</p>
                <Form profile={profile} signup={signup} countries={countries} handleSubmit={this.handleSubmit} handleChange={this.handleChange} profileData={profileData} loading={loading} authUser={authUser} />
              </article>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
