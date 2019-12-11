import { Section, ButtonSection } from "../components/section";
import Router from "next/router";

export default class Index extends React.Component {
  state = {
    authUser: null
  };

  componentDidMount() {
    const { firebase } = this.props;
    firebase.auth().onAuthStateChanged(authUser => {
      this.setState({ authUser });
    });
  }

  render() {
    return (
      <div>
        <Section title="Welcome to HappyFaces" subtitle="Achieving a Happy Face!" />
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">What is Cognitive Bias Modification(CBM)</h1>
              <h2 className="subtitle">
                <dl>
                  <li>Attentional Bias: A tendency for one's perception to be influenced by one's recurring thoughts</li>
                  <li>Therefore, CBT is an approach that repeatedly exposes one to positive things in an attempt to modify one's perception more towards posivity</li>
                  <li>Can also be known Attentional Bias Training(ABT)</li>
                </dl>
              </h2>
            </div>
          </div>
        </section>
        <style jsx>{`
          .content {
            display: flex;
            justify-content: center;
            padding: 10em;
          }
          p {
            font-size: 1.2rem;
          }
        `}</style>
      </div>
    );
  }
}
