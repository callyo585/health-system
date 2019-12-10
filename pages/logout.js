import Link from "next/link";

export default class Index extends React.Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">You have signed out successfully</h1>
            <Link href="/">
              <div className="button is-primary">
                <a className="logout">
                  <strong>Return to Home</strong>
                </a>
              </div>
            </Link>
          </div>
        </div>
        <style jsx>
          {`
            .container {
              text-align: center;
            }
            .logout {
              color: white;
            }
          `}
        </style>
      </section>
    );
  }
}
