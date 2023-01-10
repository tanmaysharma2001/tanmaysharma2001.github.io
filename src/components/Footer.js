import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/telegram-24.png";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col sm={6}>
            {/* <img src={logo} alt="logo" /> */}
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/tanmaysharma2001/">
                <img src={navIcon1} alt="" />
              </a>
              <a href="https://t.me/me_tanmay01">
                <img src={navIcon2} alt="" />
              </a>
              <a href="https://www.instagram.com/me_tanmay01">
                <img src={navIcon3} alt="" />
              </a>
            </div>
            <p>CopyRight 2023. All right Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
