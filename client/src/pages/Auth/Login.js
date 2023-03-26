import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import './auth.scss'

export const Login = ( { setIsLogged } ) => {
  
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const [errorMsg, setErrorMsg]= useState(false);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setLogin({...login, [name]:value})
    };


  const handleSubmit = (e) =>{

      e.preventDefault();

      if (login.email === "" || login.password === "") {
        setErrorMsg(true);
      } else {
        axios
        .post('http://localhost:4000/users/login', login)

        .then((res)=>{
          console.log("estoy en el then de login");
          console.log(res);

          //capturo el token que me manda el server
          const token = res.data.token;
          setIsLogged(true);

          // lo subimos a localStore
          window.localStorage.setItem("token", token);

          const type = jwtDecode(token).user.type;
          
          console.log(("tipo: ", type));

          //dependiendo del tipo de usuario que nos rediccione a un sitio u otro

          {
            type === 0
              ? navigate('/allusers', {replace: true})
              : type === 1
              ? navigate('/admin', {replace : true})
              : navigate('/', {replace: true})
          }


        })

        .catch((error) =>{
          console.log("ha habido un error, email o contraseña incorrecta");
          setErrorMsg(true);
        })
      }
  }


  return (
    <Container fluid >
      <Row className='contAuth'>
        <Col md={4}>
            <div className='divRegister'>
              <input 
                className='m-2'
                placeholder='email'
                autoComplete='off'
                name='email'
                required
                value={login.email}
                onChange={handleChange}
              />
              <input 
                className='m-2'
                placeholder='password'
                autoComplete='off'
                name='password'
                required
                value={login.password}
                onChange={handleChange}
              />

              <button
                className='m-2'
                type='submit'
                onClick={handleSubmit}
                >
                  login
                </button>
                {errorMsg && <p>Usuario o contraseña incorrecta</p>}
                <hr/>
                <p>No estas registrado?????</p>
                <button onClick={()=>navigate("/register")}>Registrate</button>


            </div>
        </Col>
      </Row>

    </Container>
  )
}
