import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";

export const FormModalEditTravel = ({
  showEditTravel,
  setShowEditTravel,
  travelAModificar,
  setTravelAModificar,
  travels,
  setTravels
}) => {
  console.log(travelAModificar);
  console.log(travels);

  const handleClose = () => setShowEditTravel(false);

  //----manejo del cambio de los input
  //----------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTravelAModificar({ ...travelAModificar, [name]: value });
  };

  //Manejo del submit para guaradar cambios
  //----------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("esto es el estado travels que es un array", travels);
    // travels[travelAModificar.index] = travelAModificar;
    let travelsprovisional = travels;
    travelsprovisional[travelAModificar.index] = travelAModificar;
    setTravels([...travels,travelsprovisional ]);

    console.log(travels);

    axios
      .put(
        `http://localhost:4000/travels/editTravel/${travelAModificar.travel_id}`,
        travelAModificar
      )
      .then((res) => {
        console.log("Datos modificados correctamente");
      })
      .catch((error) => {
        console.log(error);
      });
    setShowEditTravel(false);
  };

  return (
    <>
      <Modal show={showEditTravel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Viaje</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="formContainer">
            <form className="d-flex flex-column p-4">
              <label>Ciudad</label>
              <input
                type="text"
                name="city"
                value={travelAModificar.city}
                placeholder="Nombre de la ciudad"
                onChange={handleChange}
                autoComplete="off"
              />

              <label>Pais</label>
              <input
                type="text"
                name="country"
                value={travelAModificar.country}
                placeholder="Nombre del pais"
                onChange={handleChange}
                autoComplete="off"
              />
              <label>Descripción:</label>
              <input
                type="textarea"
                name="description"
                value={travelAModificar.description}
                placeholder="Descripción"
                onChange={handleChange}
                autoComplete="off"
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
