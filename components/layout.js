import Navbar from "./navbar";
import SigninForm from "./signin";
import SignupForm from "./signup";

export default ({ children, getPath, firebase }) => (
  <div>
    <header>
      <Navbar getPath={getPath} firebase={firebase} />
    </header>

    <SignupForm firebase={firebase} />
    <SigninForm firebase={firebase} />
    {children}
    <footer></footer>
  </div>
);
