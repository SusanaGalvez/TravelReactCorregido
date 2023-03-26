import React from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import './home.scss'
export const About = () => {
  return (
    <Container fluid className="contHome">
    <Row>
      <Col>
        <div className="divHome">
          <h1>About</h1>
          <hr />
        </div>
      </Col>
    </Row>
  </Container>
  )
}
