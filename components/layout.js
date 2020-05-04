import Navbar from "./navbar";
import SigninForm from "./signin";
import SignupForm from "./signup";

export default ({ children, getPath, firebase, authUser, path }) => (
  <div>
    <header>
      <Navbar getPath={getPath} firebase={firebase} authUser={authUser} />
    </header>

    <SignupForm firebase={firebase} getPath={getPath} />
    <SigninForm firebase={firebase} getPath={getPath} />
    {children}
    {path != "Home" ? null : (
      <footer
        className="footer"
        style={{ position: "fixed", left: 0, bottom: 0 }}>
        <div className="content has-text-centered">
          <p>
            Disclaimer: This information is not designed to replace a
            physician's independent judgment about the appropriateness or risks
            of a procedure for a given patient. Always consult your doctor about
            your medical conditions. HappyFaces does not provide medical advice,
            diagnosis or treatment. Use of this website is conditional upon your
            acceptance of our User Agreement.
          </p>
        </div>
      </footer>
    )}
  </div>
);
