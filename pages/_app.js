import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import firebase from "../lib/initialize";

import "../styles/styles.scss";

export default class MyApp extends App {
  state = {
    path: null,
    authUser: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((authUser) => {
      this.setState({ authUser });
    });
  }

  getPath = (path) => {
    this.setState({ path });
  };

  render() {
    const { Component, pageProps } = this.props;
    const { path, authUser } = this.state;

    return (
      <React.Fragment>
        <Head>
          <title>{path ? "HappyFaces - " + path : "HappyFaces - Home"}</title>
        </Head>
        <Layout
          getPath={this.getPath}
          firebase={firebase}
          authUser={authUser}
          path={path}>
          <Component
            {...pageProps}
            firebase={firebase}
            getPath={this.getPath}
            path={path}
          />
        </Layout>
      </React.Fragment>
    );
  }
}
