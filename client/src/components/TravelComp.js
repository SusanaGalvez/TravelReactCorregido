import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FormModalEditTravel } from "./FormModalEditTravel";

import { PhotoGalery } from "./PhotoGalery";
import "./travelComp.scss";

export const TravelComp = ({ travels, setTravels }) => {
  const [showEditTravel, setShowEditTravel] = useState(false);
  const [travelAModificar, setTravelAModificar] = useState();


  //-----------funcion delTravel------------------
    const delTravel = (viaje) => {
    console.log(viaje);
      
    const viajesModificado = travels.filter(
      (elem) => elem.travel_id !== viaje.travel_id
    );

    setTravels(viajesModificado);

    axios
      .put(`http://localhost:4000/travels/delTravel/${viaje.travel_id}`)
      .then((res) => {
        console.log("viaje borrado");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      
         {travels &&
         travels.map((viaje, index) => {
            return (
              <div key={index} className="travelCard">
                <div className="travelInfo">
                  <p>{viaje.travel_id}</p>
                  <h3>Ciudad: {viaje.city}</h3>
                  <h5>Pais: {viaje.country}</h5>
                  <p>Descripción: {viaje.description}</p>

                  <Button
                    className="m-2"
                    name={viaje.travel_id}
                    onClick={() => {
                      setShowEditTravel(true);
                      setTravelAModificar({ ...viaje, index: index });
                    }}
                  >
                    Editar
                  </Button>

                  <Button className="m-2" onClick={() => delTravel(viaje, index)}>
                    Eliminar
                  </Button>
                </div>

                <div className="travelPhotos">
                  <PhotoGalery viaje={viaje} />
                </div>
              </div>
            );
          })}

      {travelAModificar ? (
        <FormModalEditTravel
          showEditTravel={showEditTravel}
          setShowEditTravel={setShowEditTravel}
          travelAModificar={travelAModificar}
          setTravelAModificar={setTravelAModificar}
          travels={travels}
          setTravels={setTravels}
        />
      ) : null}
    </div>
  );
};
