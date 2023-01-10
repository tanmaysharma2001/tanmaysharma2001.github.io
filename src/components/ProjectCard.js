import { Col } from "react-bootstrap";

const ProjectCard = ({ title, role, imgUrl, link }) => {
  return (
    <Col sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} />
        <div className="proj-txtx">
          <a className="nav-link" href={link}><h4>{title}</h4></a>
          <span>{role}</span>
        </div>
      </div>
    </Col>
  );
};

export default ProjectCard;