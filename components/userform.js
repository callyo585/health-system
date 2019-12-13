import { renderDropdown } from "./helper";

export default class UserForm extends React.Component {
  render() {
    const { handleChange, handleSubmit, countries, message, profile, signup, signupDetails, profileData, loading, msgColor } = this.props;

    if (loading) {
      return (
        <section className="modal-card-body">
          <div> Loading Profile... </div>
        </section>
      );
    }

    return (
      <form onSubmit={handleSubmit} noValidate>
        <section className="modal-card-body">
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Username<span className="has-text-danger">*</span> :
            </div>
            <div className="column">
              <input className="input is-info" type="text" placeholder="e.g. example" name="username" onChange={handleChange} value={signup && signupDetails ? signupDetails.username : profileData.username} />
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">Email {signup ? <span className="has-text-danger">*</span> : null} :</div>
            <div className="column">
              <input className="input is-info" type="text" placeholder="e.g. example@example.com" name="email" onChange={handleChange} value={signup && signupDetails ? signupDetails.email : profileData.email} disabled={profile} />
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Age<span className="has-text-danger">*</span> :
            </div>
            <div className="column">
              <div className="control is-expanded">
                <div className="select is-info is-fullwidth">
                  <select name="age" onChange={handleChange} value={signup && signupDetails ? signupDetails.age : profileData.age}>
                    <option value={0}>Select Age</option>
                    {renderDropdown("age")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Gender<span className="has-text-danger">*</span> :
            </div>
            <div className="column">
              <div className="control is-expanded">
                <div className="select is-info is-fullwidth">
                  <select name="gender" onChange={handleChange} value={signup && signupDetails ? signupDetails.gender : profileData.gender}>
                    <option value="">Select Gender</option>
                    {renderDropdown("gender")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Country<span className="has-text-danger">*</span> :
            </div>
            <div className="column">
              <div className="control is-expanded">
                <div className="select is-info is-fullwidth">
                  <select name="country" onChange={handleChange} value={signup && signupDetails ? signupDetails.country : profileData.country}>
                    <option value="">Select Country</option>
                    {renderDropdown("country", countries)}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Race<span className="has-text-danger">*</span> :
            </div>
            <div className="column">
              <div className="control is-expanded">
                <div className="select is-info is-fullwidth">
                  <select name="race" onChange={handleChange} value={signup && signupDetails ? signupDetails.race : profileData.race}>
                    <option value="">Select Race</option>
                    {renderDropdown("race")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Height<span className="has-text-danger">*</span> :
            </div>
            <div className="column is-one-fourth">
              <div className="field has-addons">
                <p className="control">
                  <input className="input is-info" type="number" placeholder="e.g. 160.1" name="height" onChange={handleChange} value={signup && signupDetails ? signupDetails.height : profileData.height} />
                </p>
                <p className="control">
                  <a className="button is-static">cm</a>
                </p>
              </div>
            </div>
            <div className="column is-one-fifth">
              Weight<span className="has-text-danger">*</span> :
            </div>
            <div className="column is-one-fourth">
              <div className="field has-addons">
                <p className="control">
                  <input className="input is-info" type="number" placeholder="e.g. 80.6" name="weight" onChange={handleChange} value={signup && signupDetails ? signupDetails.weight : profileData.weight} />
                </p>
                <p className="control">
                  <a className="button is-static">kg</a>
                </p>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">Illness:</div>
            <div className="column">
              <input className="input is-info" type="text" placeholder="Physical and Mental(if any) e.g. Diabetes" name="illness" onChange={handleChange} value={signup && signupDetails ? signupDetails.illness : profileData.illness} />
            </div>
          </div>
          {signup ? (
            <React.Fragment>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">Password{signup ? <span className="has-text-danger">*</span> : null} :</div>
                <div className="column">
                  <input className="input is-info" type="password" placeholder="password" name="password" onChange={handleChange} value={signup && signupDetails ? signupDetails.password : ""}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-one-fifth">Confirm Password{signup ? <span className="has-text-danger">*</span> : null} :</div>
                <div className="column">
                  <input className="input is-info" type="password" placeholder="confirm password" name="confirmPass" onChange={handleChange} value={signup && signupDetails ? signupDetails.confirmPass : ""}></input>
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column">By signing up, you agree to allow your personal information be collected for depression data analysis.</div>
              </div>
            </React.Fragment>
          ) : null}
        </section>
        <footer className="modal-card-foot">
          <button id={signup ? "signupButton" : "updateButton"} type="submit" className="button is-info">
            {signup ? "Sign Up" : "Update"}
          </button>
          <div className={"column " + msgColor}>{message}</div>
        </footer>
      </form>
    );
  }
}
