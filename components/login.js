export default class Login extends React.Component {
  closeLogin = () => {
    document.getElementById("login").classList.remove("is-active");
  };

  render() {
    return (
      <div className="modal" id="login">
        <div className="modal-background" onClick={this.closeLogin}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Login</p>
            <button className="delete" aria-label="close" onClick={this.closeLogin}></button>
          </header>
          <section className="modal-card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">User Email: </div>
                <div className="column">
                  <input className="input is-info" type="text" placeholder="e.g. example@example.com"></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">Password: </div>
                <div className="column">
                  <input className="input is-info" type="password" placeholder="password"></input>
                </div>
              </div>
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-info">Log in</button>
          </footer>
        </div>
      </div>
    );
  }
}
