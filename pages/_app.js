import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import "../styles/styles.scss";
import firebase from "../lib/initialize";

export default class MyApp extends App {
  state = {
    authUser: null,
    path: null
  };

  getPath = path => {
    this.setState({ path });
  };

  setAuthUser = authUser => {
    this.setState({ authUser });
  };

  render() {
    const { Component, pageProps } = this.props;
    const { path, authUser } = this.state;

    return (
      <React.Fragment>
        <Head>
          <title>{path ? "HappyFaces - " + path : "HappyFaces - Home"}</title>
        </Head>
        <Layout getPath={this.getPath} firebase={firebase} authUser={authUser} setAuthUser={this.setAuthUser}>
          <Component {...pageProps} firebase={firebase} />
        </Layout>
      </React.Fragment>
    );
  }
}
