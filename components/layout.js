import Navbar from "./navbar";
import LoginForm from "./login";
import SignupForm from "./signup";

export default ({ children, getPath, firebase, authUser, setAuthUser }) => (
  <div>
    <header>
      <Navbar getPath={getPath} firebase={firebase} authUser={authUser} setAuthUser={setAuthUser} />
    </header>

    <SignupForm firebase={firebase} authUser={authUser} setAuthUser={setAuthUser} />
    <LoginForm firebase={firebase} authUser={authUser} setAuthUser={setAuthUser} />
    {children}
    <footer></footer>
  </div>
);
