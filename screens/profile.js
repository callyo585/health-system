import Form from "../components/form";

export default class Profile extends React.Component {
  state = {
    authUser: null,
    countries: [],
    statusCountries: null,
    profile: true,
    signup: false
  };

  componentDidMount() {
    const { firebase, getCountries, getCountriesStatus } = this.props;

    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then(authUser => {
            this.setState({ authUser: authUser.data(), countries: getCountries, statusCountries: getCountriesStatus });
          });
      }
    });
  }

  componentWillUnmount() {
    const { firebase, getCountries, getCountriesStatus } = this.props;

    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(authUser.email)
          .get()
          .then(authUser => {
            this.setState({ authUser: authUser.data(), countries: getCountries, statusCountries: getCountriesStatus });
          });
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
    const { authUser, countries, profile, signup } = this.state;

    return (
      <React.Fragment>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <article className="panel is-link">
                <p className="panel-heading">Profile Info</p>
                <Form profile={profile} signup={signup} authUser={authUser} countries={countries} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
              </article>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
