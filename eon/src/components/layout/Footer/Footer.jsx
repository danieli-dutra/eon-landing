import "./Footer.css";
import logo from "../../../assets/images/logo/eon-logo-light.svg";

function Footer() {

  return (

    <footer className="footer">

      <img
        src={logo}
        alt="EON"
        className="footer__logo"
      />

      <p className="footer__copyright">

        © 2026 EON. All rights reserved.

        <br />
        Built for what's next.

      </p>

    </footer>

  );

}

export default Footer;