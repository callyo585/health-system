import { ButtonSection } from "../components/section";

export default class Signout extends React.Component {
  handleGetPath = (path) => {
    const { getPath } = this.props;
    getPath(path);
  };

  render() {
    return (
      <ButtonSection
        title="You have signed out successfully"
        button="Return to Home"
        href="/"
        onClick={() => {
          this.handleGetPath("/");
        }}
      />
    );
  }
}
