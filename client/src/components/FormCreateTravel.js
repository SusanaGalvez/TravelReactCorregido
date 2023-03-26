import axios from 'axios';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

export const FormCreateTravel = ({setShowFormCreateTravel, user, setTravels}) => {

    const [regTravel, setRegTravel] = useState({
        city:"",
        country:"",
        description:""
    })

    const [travelFiles, setTravelFiles] = useState();
    
    const handleChange = (e) =>{
        const { value, name} = e.target;
        setRegTravel({...regTravel, [name]: value});
    }


    const handleFiles = (e) =>{
        console.log(e.target.files);
        setTravelFiles(e.target.files)
    }
    

    const handleSubmit = (e) =>{
    
        // fabrico un saco de tela
        //     const saco = new sacodetela
        //     const saco =  new ForData();

        // meto el viaje (necesito una herramienta que se llama append)

        //     saco.append(regTravel)

        // una bolsa de fotos
        
        // voy sacando fotos de una en una y a medida que las saco las meto en el saco de tela

        // for(coge todas las fotos de 1 en 1 y no pares hasta que se acaben)
        //     saco.append(foto1)
        //     saco.append(foto2)
        //     saco.append(foto3)

        // saco tengo regTravel y 3 fotos sueltas



        e.preventDefault();
        console.log("este es el user_id", user.user_id)

        const newFormData = new FormData();

        newFormData.append("regTravel", JSON.stringify(regTravel))
    
        if(travelFiles){
            for(const elem of travelFiles){
                 newFormData.append("file", elem);
            }
        }

        axios
            .post(`http://localhost:4000/travels/createTravel/${user.user_id}`, newFormData)
            .then((res) => {
                console.log(res.data)
                if(res.data){
                    setTravels(res.data);
                    setShowFormCreateTravel(false);

                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

  return (
    <Row>
        <Col md={4}>
            <div className='formContainer'>
                <h1>Crear Nuevo viaje</h1>
                <hr/>
                <form
                    className='d-flex flex-column'
                    encType='multipart/form'>
                       
                        <label>Ciudad</label>
                        <input
                            type='text'
                            name="city"
                            placeholder='ciudad'
                            value={regTravel.city}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <label>Pais</label>
                        <input
                            type='text'
                            name="country"
                            placeholder='Pais'
                            value={regTravel.country}
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        <label>Description</label>
                        <input
                            type='textarea'
                            name="description"
                            placeholder='Descripción'
                            value={regTravel.description}
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        <label>imagenes</label>
                        <input
                            type="file"
                            onChange={handleFiles}
                            multiple
                        />

                        <button type='submit' onClick={handleSubmit}>Guardar</button>

                        <button onClick={()=>setShowFormCreateTravel(false)}>Cancelar</button>

                </form>

            </div>
        </Col>
    </Row>
  )
}
//formulario de creación con:
// city
// country
// description
// input para subir fotos
//boton para hacer el submit
//boton para cacelar y nos cierre formulario

