import Profile from "../screens/profile";

export default class Index extends React.Component {
  static async getInitialProps() {
    const response = await fetch("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;");
    const getCountriesStatus = response.status > 200 ? response.status : false;
    const getCountries = await response.json();

    return { getCountries, getCountriesStatus };
  }
  render() {
    const { firebase, getCountries } = this.props;
    return <Profile firebase={firebase} getCountries={getCountries} />;
  }
}
