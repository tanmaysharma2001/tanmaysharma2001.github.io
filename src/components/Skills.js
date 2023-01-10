import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Col, Row } from "react-bootstrap";

import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";

import colorSharp from "../assets/img/color-sharp.png";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="skill" id="skills">
      <Container>
        <Row>
          <Col>
            <div className="skill-bx">
                <h2>
                    Skills
                </h2>
                <p>These are the major skills that I developed by practicing and building projects. You can find all the projects that I did using these stacks down below.</p>
                <Carousel responsive={responsive} infinite={true} className="skill-slider">
                    <div className="item">
                        <img src={meter1} alt="Image" />
                        <h5>Frontend Development</h5>
                        <p>HTML/CSS/JavaScript, REACT, Svelte</p>
                    </div>
                    <div className="item">
                        <img src={meter2} alt="Image" />
                        <h5>Backend Developemnt</h5>
                        <p>Python Django, Nodejs and Express</p>
                    </div>
                    <div className="item">
                        <img src={meter3} alt="Image" />
                        <h5>BlockChain Developemnt</h5>
                        <p>Solidity, JavaScript, Ether.js, HardHat</p>
                    </div>
                    <div className="item">
                        <img src={meter1} alt="Image" />
                        <h5>Mobile App Developemnt</h5>
                        <p>REACT Native, Flutter</p>
                    </div>
                </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colorSharp} />
    </section>
  );
};
