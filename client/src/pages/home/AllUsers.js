import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allUsers.scss";
import {useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";


export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  //solicitar todos los viajes de todos los usuarios para motrarlos

  const navigate = useNavigate();


  useEffect(() => {
    const AUTH_TOKEN = window.localStorage.getItem("token");
    axios.defaults.headers.common["authorization"] = `Bearer ${AUTH_TOKEN}`;
    axios
      .get("http://localhost:4000/users/allUser")

      .then((res) => {
        console.log(res.data);
        res && setAllUsers(res.data);
       
      })
      .catch((error) => {
        console.log("errorrrrrrr en el axios");
      });
  }, []);

  return (
    <>
    <div className="contAllUsers">
      <h1>AllUsers</h1>
      <hr />
      {allUsers.map((user, ind) => {
        return (
        
          <div className="userCards" key={ind}>
            <div>
            <h3>usuario: {user.name}</h3>
            <h3>{user.country}</h3>
            <h3>{user.city}</h3>
            <p>{user.description}</p>
          </div>
          <img className="photo"
                src={`/images/travel/${user.photo_name}`}/>
                 <Button onClick={()=>{navigate(`/travel/${user.travel_id}`)}}>Ver viaje</Button>
          </div>
        );
      })}
    </div>
    </>
  );
};
