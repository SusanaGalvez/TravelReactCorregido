import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import './home.scss'
export const Home = () => {
  return (
    <Container fluid className='contHome' >
        <Row>
            <Col>
                <div className='divHome'>
                    <h1>Travels</h1>
                    <h2>Experiencias y viajes</h2>
                </div>    
            </Col>
        </Row>
   


    </Container>
        
  )
}
