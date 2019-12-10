import Link from "next/link";
import { ButtonSection } from "../components/section";

export default class Signout extends React.Component {
  render() {
    return <ButtonSection title="You have signed out successfully" button="Return to Home" href={{ href: "/" }} />;
  }
}
