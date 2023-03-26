import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import './travel.scss'

export const Travel = () => {
  const [travel, setTravel] = useState();
  const [photos, setPhotos] = useState();
  const { travel_id } = useParams();

  console.log(travel_id);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/travels/getTravelPhotos/${travel_id}`)
      .then((res) => {
        if (res) {
          setTravel(res.data.resultTravel[0]);
          setPhotos(res.data.resultPhotos);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(travel);

  return (
   
    <Container>
    {travel &&
      <Row>
        <Col>
          <h1>{travel.city}</h1>
          <h2>{travel.country}</h2>
          <h2>{travel.description}</h2>
        </Col>
      </Row>}

      {photos && 
      <Row className="mt-5">
        <Carousel>
        {photos.map((foto, index)=>{return(

          <Carousel.Item className="contCarrusel">
            <img
              className="d-block w-100"
              src={`/images/travel/${foto.photo_name}`}
              alt="First slide"
            />
          
          </Carousel.Item>

        )})
          
          } 
        </Carousel>
      </Row>}
    </Container>
  );
};
