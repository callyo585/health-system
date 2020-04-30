export default class Admin extends React.Component {
  state = {
    loading: true,
    checkUserDetails: false,
    checkUsers: true,
  };

  componentDidMount() {
    const { firebase, getPath } = this.props;

    getPath("Admin");

    firebase
      .firestore()
      .collection("users")
      .get()
      .then((users) => {
        const userList = [];
        users.forEach((user) => {
          userList.push(user.data());
        });
        this.setState({ userList: userList, loading: false });
      });
  }

  handleUserDetails = (email) => {
    const { firebase } = this.props;

    this.setState({
      checkUserDetails: true,
      checkUsers: false,
      loading: true,
      email: email,
    });

    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .collection("gameResults")
      .get()
      .then((gameResults) => {
        const resultList = [];
        gameResults.forEach((gameResult) => {
          resultList.push(gameResult.data());
        });
        this.setState({ resultList: resultList.reverse(), loading: false });
      });
  };

  handleBack = () => {
    if (this.state.checkUserDetails) {
      this.setState({
        checkUserDetails: false,
        checkUsers: true,
      });
    }
  };

  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Admin Panel</h1>
            <h2 className="subtitle">
              {this.state.loading
                ? "loading..."
                : this.state.checkUserDetails && this.state.checkGameDetails
                ? this.state.createdAt
                : this.state.checkUserDetails
                ? this.state.email
                : "Users"}
              <button
                className="button is-primary"
                onClick={() => this.handleBack()}
                style={{ float: "right" }}
                disabled={this.state.loading || this.state.checkUsers}>
                Back
              </button>
            </h2>
            <h2 className="subtitle">
              {this.state.loading ? null : this.state.checkUserDetails ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Game ID</th>
                      <th>Time Played</th>
                      <th>Total Correct Time</th>
                      <th>Average Correct Time</th>
                      <th>Total Correct Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.resultList.map((result) => {
                      return (
                        <tr key={result.resultId}>
                          <td>{result.resultId}</td>
                          <td>{result.createdAt}</td>
                          <td>{result.totalCorrectTime}</td>
                          <td>{result.avgCorrectTime}</td>
                          <td>{result.totalCorrect}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userList.map((user) => {
                      return (
                        <tr key={user.email}>
                          <td>{user.email}</td>
                          <td>
                            <button
                              className="button is-primary"
                              onClick={() =>
                                this.handleUserDetails(user.email)
                              }>
                              User Game Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </h2>
          </div>
        </div>
      </section>
    );
  }
}
