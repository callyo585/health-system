import Navbar from "./navbar";
import SigninForm from "./signin";
import SignupForm from "./signup";

export default ({ children, getPath, firebase, authUser }) => (
  <div>
    <header>
      <Navbar getPath={getPath} firebase={firebase} authUser={authUser} />
    </header>

    <SignupForm firebase={firebase} />
    <SigninForm firebase={firebase} />
    {children}
    <footer></footer>
  </div>
);
