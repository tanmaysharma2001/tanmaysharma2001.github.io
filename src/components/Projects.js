import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";

import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const frontendProjects = [
    {
      title: "CV Parser - Resume Extractor",
      role: "Frontend Developer (Dart & Flutter)",
      imgUrl: projImg1,
      link: "https://github.com/InnoSWP/BS21-08-CV-Parser",
    },
    {
      title: "QuizMaster",
      role: "Frontend Developer (Svelte)",
      imgUrl: projImg2,
      link: "https://github.com/tanmaysharma2001/quizmaster",
    },
  ];

  const backendProjects = [
    {
      title: "Object Detector",
      role: "Backend Developer (Python Django)",
      imgUrl: projImg3,
      link: "https://github.com/tanmaysharma2001/object_detector"
    },
  ]

  const fullstackProjects = [
    
  ]

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__slideInUp" : ""
                  }
                >
                  <h2>Projects</h2>
                  <p>Projects done by me.</p>
                </div>
              )}
            </TrackVisibility>
            <Tab.Container id="project-tabs" defaultActiveKey="first">
              <Nav
                variant="pills"
                className="nav-pills mb-5 justify-content-center align-items-center"
                id="pills-tab"
              >
                <Nav.Item>
                  <Nav.Link eventKey="first">Frontend Development</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Backend Development</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="third">FullStack Development</Nav.Link>
                </Nav.Item> */}
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    {frontendProjects.map((frontendProjects, index) => {
                      return <ProjectCard key={index} {...frontendProjects} />;
                    })}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Row>
                    {backendProjects.map((backendProjects, index) => {
                      return <ProjectCard key={index} {...backendProjects} />;
                    })}
                  </Row>
                </Tab.Pane>
                {/* <Tab.Pane eventKey="third">
                  <Row>
                    {fullstackProjects.map((fullstackProjects, index) => {
                      return <ProjectCard key={index} {...fullstackProjects} />;
                    })}
                  </Row>
                </Tab.Pane> */}
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};
