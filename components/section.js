import Link from "next/link";

export const Section = props => (
  <section className="hero">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">{props.title}</h1>
        <h2 className="subtitle">{props.subtitle}</h2>
      </div>
    </div>
  </section>
);

export const ButtonSection = props => (
  <section className="hero">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">{props.title}</h1>
        <Link href={props.href}>
          <button id="verification" className="button is-primary signout" onClick={props.onClick}>
            <strong>{props.button}</strong>
          </button>
        </Link>
      </div>
    </div>
    <style jsx>
      {`
        .container {
          text-align: center;
        }
        .signout {
          font-family: "McLaren", cursive;
          color: white;
        }
      `}
    </style>
  </section>
);
