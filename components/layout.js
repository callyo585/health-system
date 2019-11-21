import Navbar from "./navbar";
import LoginForm from "./login";
import SignupForm from "./signup";

export default ({ children, getPath, firebase }) => (
  <div>
    <header>
      <Navbar getPath={getPath} firebase={firebase} />
    </header>

    <SignupForm firebase={firebase} />
    <LoginForm firebase={firebase} />
    {children}
    <footer></footer>
  </div>
);
