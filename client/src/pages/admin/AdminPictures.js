import React, { useEffect, useRef, useState } from "react";
import "./admin.scss";
import "./adminPictures.scss";
import { Button, Container, Col, Row } from "react-bootstrap";
import axios from "axios";


export const AdminPictures = () => {
  const [pics, setPics] = useState();
  const buttonRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllPics")
      .then((res) => {
        console.log(res);
        setPics(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

const handleEnable = (id, is_del) =>{
    console.log(id)
    console.log(is_del)

    let url=`http://localhost:4000/admin/desablePic/${id}`;
        
        if(is_del === 1){
         console.log("hola")
            url=`http://localhost:4000/admin/enablePic/${id}`;
        }

        axios
            .put(url)
            .then((res)=>{
                console.log(res.data);
                setPics(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })


}


  return (
       <div >
         {pics && (
            <div className="contFotos">
              {pics.map((pic, index) => {
                return (
                  <div key={index} className="adminPics">
                    {pic.is_deleted === 0 ? 
                    <img src={`/images/travel/${pic.photo_name}`} />: <img src={`/assets/images/deleted.png`} />}
                    <button 
                    className="m-2"
                    onClick={()=>handleEnable(pic.photo_id, pic.is_deleted)}
                    >{pic.is_deleted===0 ? "desable":"enable"}</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
  );
};
