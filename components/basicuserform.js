import Link from "next/link";

export default class BasicUserForm extends React.Component {
  render() {
    const { incorrect, error, email, password, signin, handleChange, handleSubmit, toggleSignin, reset, display, resetMsg, resetColor } = this.props;

    return (
      <div className={reset} id="basicForm">
        <form onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="columns is-mobile">
              <div className="column is-one-fifth">User Email: </div>
              <div className="column">
                <input className="input is-info" type="text" placeholder="e.g. example@example.com" name="email" onChange={handleChange} value={email}></input>
              </div>
              {reset ? (
                <div className="column is-one-fifth has-text-centered">
                  <button id="resetButton" className="button is-primary">
                    Reset Password
                  </button>
                </div>
              ) : null}
            </div>
            {signin ? (
              <div className="columns is-mobile">
                <div className="column is-one-fifth">Password: </div>
                <div className="column">
                  <input className="input is-info" type="password" placeholder="password" name="password" onChange={handleChange} value={password}></input>
                </div>
              </div>
            ) : null}
            {signin ? (
              <div className="columns is-mobile">
                <div className="column">
                  <Link href="/reset">
                    <a onClick={toggleSignin}>Forgot password?</a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="columns is-mobile">
                <div className={"column" + resetColor}>{resetMsg}</div>
              </div>
            )}
          </section>
          <footer className="modal-card-foot" style={{ display: display }}>
            <button id="signinButton" className="button is-info">
              Log in
            </button>
            {incorrect ? <div className="column has-text-danger incorrect"> {error} </div> : null}
          </footer>
        </form>
      </div>
    );
  }
}
