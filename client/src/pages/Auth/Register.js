import React, { useState } from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './auth.scss'
import axios from 'axios' 

export const Register = () => {
  
  const [regMessage, setRegMessage] = useState("");
  
  const [register, setRegister] = useState({
      name:'',
      email:'',
      password:''
  });

  //Manejo de los inputs y seteo de register
  const handleChange = (e) => {
    
    const {value, name} = e.target;
    setRegister({...register, [name]:value})
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if(register.name === "" || register.email === "" || register.password ===""){
      console.log("algun campo esta vacio");
      setRegMessage("Debes rellenar todos los campos. Es OBLIGATORIO!!!!!");

    }else{
      
      axios
        .post("http://localhost:4000/users/createUser", register)
        .then((res)=>{
          console.log(res)
          navigate('/login')
        })
        .catch((error) => {
          console.log(error.response.dat);
          console.log("ha habido un error");
          console.log("email duplicado");
          setRegMessage("Email duplicado, introduce otro, por favor")

        })

  }};





  const navigate = useNavigate();


  return (
    <Container fluid>
      <Row className="contAuth">
        <Col md={4}>
          <div className='divRegister'>

            <input
              className='m-2'
              placeholder='name'
              autoComplete='off'
              name='name'
              required
              value={register.name}
              onChange={handleChange}
            />
            <input
            className='m-2'
              type='email'
              placeholder='email'
              autoComplete='off'
              name='email'
              required
              value={register.email}
              onChange={handleChange}
            />
            <input
            className='m-2'
              placeholder='password'
              type='password'
              autoComplete='off'
              name='password'
              required
              value={register.password}
              onChange={handleChange}
            />

            <button
            className='m-2'
            type='submit'
            onClick={handleSubmit}>
              Registrar
            </button>

            {regMessage}

            <hr/>
            <p>Ya estás registrado?</p>
            <button
            className='m-2'
              onClick={()=>navigate('/login')}
            >login</button>

          </div>
        
        </Col>
      </Row>
    </Container>
  )
}
