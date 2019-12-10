import { renderDropdown } from "./helper";

export default class Form extends React.Component {
  render() {
    const { handleChange, handleSubmit, countries, error, profile, signup, signupDetails, profileData, loading, valid } = this.props;

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
            <div className="column is-one-fifth">
              Email<span className="has-text-danger">*</span> :
            </div>
            <div className="column">
              <input className="input is-info" type="text" placeholder="e.g. example@example.com" name="email" onChange={handleChange} value={signup && signupDetails ? signupDetails.email : profileData.email} />
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Age<span className="has-text-danger">*</span> :
            </div>
            <div className="column">
              <div className="control">
                <div className="select is-info">
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
              <div className="control">
                <label className="radio">
                  <input type="radio" name="gender" value="M" onChange={handleChange} defaultChecked={(signup && !!signupDetails && signupDetails.gender == "M") || (profile && !!profileData && profileData.gender == "M") ? true : false} />
                  Male
                </label>
                <label className="radio">
                  <input type="radio" name="gender" value="F" onChange={handleChange} defaultChecked={(signup && !!signupDetails && signupDetails.gender == "F") || (profile && !!profileData && profileData.gender == "F") ? true : false} />
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Country<span className="has-text-danger">*</span> :
            </div>
            <div className="column">
              <div className="control">
                <div className="select is-info">
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
              <div className="control">
                <div className="select is-info">
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
              <input className="input is-info" type="number" placeholder="in cm(e.g. 160.1)" name="height" onChange={handleChange} value={signup && signupDetails ? signupDetails.height : profileData.height} />
            </div>
            <div className="column is-one-fifth">
              Weight<span className="has-text-danger">*</span> :
            </div>
            <div className="column is-one-fourth">
              <input className="input is-info" type="number" placeholder="in kg(e.g. 80.6)" name="weight" onChange={handleChange} value={signup && signupDetails ? signupDetails.weight : profileData.weight} />
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">Illness:</div>
            <div className="column">
              <input className="input is-info" type="text" placeholder="Physical and Mental(if any) e.g. Diabetes" name="illness" onChange={handleChange} value={signup && signupDetails ? signupDetails.illness : profileData.illness} />
            </div>
          </div>
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
          {signup && !profile ? (
            <div className="columns is-mobile">
              <div className="column">By signing up, you agree to allow your personal information be collected for depression data analysis.</div>
            </div>
          ) : null}
        </section>
        <footer className="modal-card-foot">
          <button id="button" type="submit" className="button is-info">
            {signup && !profile ? "Sign Up" : "Update"}
          </button>
          {valid ? null : <div className="column has-text-danger">{error}</div>}
        </footer>
      </form>
    );
  }
}
