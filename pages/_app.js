import App from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import "../styles/styles.scss";
import firebase from "../lib/initialize";

export default class MyApp extends App {
  state = {
    path: null
  };

  getPath = path => {
    this.setState({ path });
  };

  render() {
    const { Component, pageProps } = this.props;
    const { path } = this.state;

    return (
      <React.Fragment>
        <Head>
          <title>{path ? "HappyFaces - " + path : "HappyFaces - Home"}</title>
        </Head>
        <Layout getPath={this.getPath} firebase={firebase}>
          <Component {...pageProps} firebase={firebase} />
        </Layout>
      </React.Fragment>
    );
  }
}
