import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Col, Row, Button } from "react-bootstrap";
import { TravelComp } from "../../components/TravelComp";
import { FormCreateTravel } from "../../components/FormCreateTravel";


export const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [travels, setTravels] = useState();
  const [showFormCreateTravel, setShowFormCreateTravel] = useState(false);
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/oneUser/${id}`)
      .then((res) => {
        console.log("ussswsweewerwrwer",res);
        setUser(res.data.resultUser[0]);
        setTravels(res.data.resultTravel)
      })
      .catch((error) => {
        console.log("ha habiodo un error");
      });
  }, []);

  return (
    <Container fluid>
      {user ? (
        <Row>
          <Col >
            <h1>User</h1>
            <hr />
            <p>Nombre usuario: {user.name}</p>
            <p>Email usuario: {user.email}</p>
            <p>Dirección: {user.address}</p>
            <p>Phone: {user.phone}</p>
           
            <Button onClick={()=>navigate(`/editUser/${user.user_id}`)}>Editar Usuario</Button>
         
            <hr />
          </Col>
          <Col>
          {user.img? (
            <img className="photoUser"
                  src={`/images/user/${user.img}`}/>
          ):(<img className="photoUser"
                  src={"/images/user/avatarmujer.png"}/>)}

          </Col>
        </Row>
      ) : null}

    {travels? (
      <Row>
        <Col>
          <h1>Viajes</h1>
          <Button onClick={() => setShowFormCreateTravel(true)}>
            Crear viaje
          </Button>
          <hr />
        </Col>
        {!showFormCreateTravel ?(
        <TravelComp travels={travels} setTravels={setTravels} />
         ) : ( 
         <FormCreateTravel 
              user={user}
              setShowFormCreateTravel={setShowFormCreateTravel}
              setTravels={setTravels}
              />
        )}
        </Row>
      ):null}
    </Container>
  );
};
