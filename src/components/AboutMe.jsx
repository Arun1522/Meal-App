import React from "react";
import { Container } from "react-bootstrap";

const AboutMe = () => {
  return (
    <Container className="text-center">
      <h1>About Mobile Programming LLC</h1>
      <p style={{textAlign:'left'}}>
        Mobile Programming LLC was started with the mission to provide “Economic
        as well as Efficient” software solutions. We firmly believe in the
        credibility and scalability of Digital Transformation. Our services are
        focused on Mobility Solutions, Custom App Development, Cloud Solutions,
        IoT, AR/VR, Blockchain, Artificial Intelligence & Machine Learning,
        Predictive Analytics & Big Data Solutions, and several other trending as
        well as emerging technologies. At its core, Mobile Programming LLC is all
        about developing solutions which help clients accelerate their business
        processes, achieve optimum productivity, and mitigate risks. This year
        only we just rebranded our company name to programming.com from mobile
        programming india pvt ltd.
      </p>

      <p>
        <strong>Website:</strong>{" "}
        <a href="https://programming.com/" target="_blank" rel="noopener noreferrer">
          programming.com
        </a>
      </p>

      <p>
        <strong>Industry:</strong> Information Technology & Services
      </p>

      <p>
        <strong>Company size:</strong> 5,000+ employees
      </p>

      <p>
        <strong>Headquarters:</strong> Los Angeles, California
      </p>

      <p>
        <strong>Type:</strong> Privately Held
      </p>

      <p>
        <strong>Founded:</strong> 2000
      </p>

      <p style={{textAlign:'left'}}>
        <strong>Specialties:</strong> Internet of Things (IoT), BI Analytics, iOS
        Development, Android Development, HTML5 Development, Artificial
        Intelligence, Augmented Reality, Virtual Reality, Big Data Analytics,
        Cloud Programming, Custom Mobile App Development, Custom Web Development,
        CMS Integration, and Digital Transformation
      </p>
    </Container>
  );
};

export default AboutMe;
