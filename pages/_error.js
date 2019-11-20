export default class Error extends React.Component {
  render() {
    return (
      <div>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Error!</h1>
              <h2 className="subtitle">{this.props.status ? `Data not found!` : `Page Not found!`}</h2>
            </div>
          </div>
        </section>
        <style jsx>
          {`
            justify-contents: center;
            align-items: center;
            text-align: center;
          `}
        </style>
      </div>
    );
  }
}
