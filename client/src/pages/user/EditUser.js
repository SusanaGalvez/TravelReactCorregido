import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {Col, Row, Container, Button} from 'react-bootstrap'
import axios from 'axios';

export const EditUser = () => {
    const {id}= useParams();
    const [editUser, setEditUser] = useState({
        name:"",
        lastname:"",
        phone:"",
        address:"",
        email: ""
    });
  
    const [file, setFile] = useState();
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    useEffect(() => {
      
        axios
            .get(`http://localhost:4000/users/getEditUser/${id}`)
            .then((res)=>{
                console.log(res.data[0]);
                setEditUser(res.data[0]);
            })
            .catch((error)=>{
                console.log(error);
            })
    }, [])
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setEditUser({...editUser, [name]:value})
    }

    const handleFile = (e) =>{
        setFile(e.target.files[0]);
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        
        const newFormData = new FormData();
        newFormData.append("file", file);
        newFormData.append("register", JSON.stringify(editUser))
        
        axios
            .put(`http://localhost:4000/users/editUser/${id}`, newFormData)
            .then((res)=>{
                console.log(res);
                navigate(`/user/${id}`);
            })
            .catch((error)=>{
                console.log(error);
            })

    }
  
    return (
        <Container>
            <Row>
                <Col>
                <form
                    encType='multipart/form'
                    className="d-flex flex-column w-50">    
                    <h2>Editar usuario</h2>
                    <hr/>
                    
                    <label>Nombre:</label>
                    <input
                    type='text'
                    className="m-2"
                    placeholder="name"
                    name="name"
                    value={editUser.name}
                    onChange={handleChange}
                    autoComplete="off"
                    />
                
                    <label>Apellido:</label>
                    <input
                    type='text'
                    className="m-2"
                    placeholder="lastname"
                    name="lastname"
                    value={editUser.lastname}
                    onChange={handleChange}
                    autoComplete="off"
                    />
                
                    <label>Direccion:</label>
                    <input
                    type='text'
                    className="m-2"
                    placeholder="address"
                    name="address"
                    value={editUser.address}
                    onChange={handleChange}
                    autoComplete="off"
                    />
                
                    <label>Telefono:</label>
                    <input
                    type='text'
                    className="m-2"
                    placeholder="phone"
                    name="phone"
                    onChange={handleChange}
                    value={editUser.phone}
                    autoComplete="off"
                    />
                    
                    <label>Email:</label>
                    <input
                    type='text'
                    className="m-2"
                    placeholder="phone"
                    name="phone"
                    onChange={handleChange}
                    value={editUser.email}
                    autoComplete="off"
                    />
        
                    <input
                    type='file'
                    className="m-2"
                    autoComplete="off"
                    onChange={handleFile}
                    />
                    {message}
            
                    <div>
                        <Button
                            type="onSubmit"
                            className="m-2"
                            onClick={handleSubmit}>
                                Guardar cambios
                        </Button>
                        
                        <Button
                            type="onSubmit"
                            onClick={()=>navigate(`/user/${id}`)}>
                                Cancelar
                        </Button>

                    </div>

                </form>
              </Col>
            </Row>
        </Container>
    
  );
};
