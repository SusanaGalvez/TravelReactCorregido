import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './home.scss'

export const Service = () => {
  return (
    <Container fluid className="contHome">
      <Row>
        <Col>
          <div className="divHome">
            <h1>Service</h1>
            <hr />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
