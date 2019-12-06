import { renderDropdown } from "./helper";

export default class Form extends React.Component {
  render() {
    const { handleChange, handleSubmit, countries, error, profile, signup, authUser } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <section className="modal-card-body">
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Username<span className="red">*</span> :
            </div>
            <div className="column">
              <input className="input is-info" type="text" placeholder="e.g. example" name="username" onChange={handleChange} defaultValue={authUser ? authUser.username : null}></input>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Email<span className="red">*</span> :
            </div>
            <div className="column">
              <input className="input is-info" type="text" placeholder="e.g. example@example.com" name="email" onChange={handleChange} value={authUser ? authUser.email : null}></input>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Age<span className="red">*</span> :
            </div>
            <div className="column">
              <div className="control">
                <div className="select is-info">
                  <select name="age" onChange={handleChange} value={authUser ? authUser.age : null}>
                    <option value={null}>Select Age</option>
                    {renderDropdown("age")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Gender<span className="red">*</span> :
            </div>
            <div className="column">
              <div className="control">
                <label className="radio">
                  <input type="radio" name="gender" value="M" onChange={handleChange} defaultChecked={authUser && authUser.gender == "M" ? true : false} />
                  Male
                </label>
                <label className="radio">
                  <input type="radio" name="gender" value="F" onChange={handleChange} defaultChecked={authUser && authUser.gender == "F" ? true : false} />
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Country<span className="red">*</span> :
            </div>
            <div className="column">
              <div className="control">
                <div className="select is-info">
                  <select name="country" onChange={handleChange} value={authUser ? authUser.country : null}>
                    <option value="notSelected">Select Country</option>
                    {renderDropdown("country", countries)}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Race<span className="red">*</span> :
            </div>
            <div className="column">
              <div className="control">
                <div className="select is-info">
                  <select name="race" onChange={handleChange} value={authUser ? authUser.race : null}>
                    <option value="notSelected">Select Race</option>
                    {renderDropdown("race")}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Height<span className="red">*</span> :
            </div>
            <div className="column is-one-fourth">
              <input className="input is-info" type="number" placeholder="in cm(e.g. 160.1)" name="height" onChange={handleChange} value={authUser ? authUser.height : null}></input>
            </div>
            <div className="column is-one-fifth">
              Weight<span className="red">*</span> :
            </div>
            <div className="column is-one-fourth">
              <input className="input is-info" type="number" placeholder="in kg(e.g. 80.6)" name="weight" onChange={handleChange} value={authUser ? authUser.weight : null}></input>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">Illness:</div>
            <div className="column">
              <input className="input is-info" type="text" placeholder="Physical and Mental(if any) e.g. Diabetes" name="illness" onChange={handleChange} value={authUser ? authUser.illness : null}></input>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Password<span className="red">*</span> :
            </div>
            <div className="column">
              <input className="input is-info" type="password" placeholder="password" name="password" onChange={handleChange}></input>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-one-fifth">
              Confirm Password<span className="red">*</span> :
            </div>
            <div className="column">
              <input className="input is-info" type="password" placeholder="confirm password" name="confirmPass" onChange={handleChange}></input>
            </div>
          </div>
          {signup && !profile ? (
            <div className="columns is-mobile">
              <div className="column">By signing up, you agree to allow your personal information be collected for depression data analysis.</div>
            </div>
          ) : null}
        </section>
        <footer className="modal-card-foot">
          <button type="submit" className="button is-info">
            {signup && !profile ? "Sign Up" : "Update"}
          </button>
          {error}
        </footer>
        <style jsx>
          {`
            .red {
              color: red;
            }
          `}
        </style>
      </form>
    );
  }
}
