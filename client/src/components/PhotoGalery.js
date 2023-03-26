import axios from "axios";
import React, { useEffect, useState } from "react";
import {Button} from 'react-bootstrap'

export const PhotoGalery = ({ viaje }) => {
  const [imagenes, setImagenes] = useState([]);
  const [showInput, setShowInput] = useState(false);
  
  // //estado para poder subir mas fotos
  const [travelImgs, setTravelImgs] = useState();

  // console.log(travel);

   useEffect(() => {
     axios
       .get(`http://localhost:4000/travels/getImgs/${viaje.travel_id}`)

       .then((res) => {
         console.log(res.data);
          setImagenes(res.data);
       })
       .catch((error) => {
         console.log("ha habido un error");
       });
   }, []);

  
  
   //-----------funcion manejo input rtipo file de las fotos
   const handleFiles = (e) => {
     setTravelImgs(e.target.files);
   }
  
   //-----------guardar las nuevas fotos
   const handleSubmit = (e) => {
       e.preventDefault();
       const newFormData = new FormData();

       if(travelImgs){
         for (const elem of travelImgs){
           newFormData.append("file", elem);
         }
       }
    
       axios
       .put(`http://localhost:4000/travels/addImgs/${viaje.travel_id}`, newFormData)

       .then((res)=>{
          setImagenes(res.data);
       })
       .catch((error)=>{
         console.log(error);
       })
      
       setShowInput(false);
      
     }

//-------------función borre las imagenes

     const delImage = (foto) =>{

         console.log("estaaa es la funncionnnn delImg" , foto);
         console.log("estaaa es la funncionnnn delImg" , foto.photo_id);
       
          axios
            .put(`http://localhost:4000/travels/delPhoto/${foto.photo_id}`)
            .then((res)=>{
                console.log("imagen borrada correctamente");
              })
              .catch((error)=>{
                  console.log(error.response.data);
                })
            
          
             const nuevoArray = imagenes.filter(
                 (elem) => elem.photo_id !== foto.photo_id
                 );
           
             console.log("*******************", imagenes)    
             console.log("-----*****************",nuevoArray)
            
             setImagenes(nuevoArray);
             console.log("**********despues del seteo*", imagenes)    
            
             }


    
    
     return (
       <div className="photoGalery">
       {imagenes && (
         <>
           {imagenes.map((foto, index) => {
             return(
               <div className="contFoto" key={index}>
                   <img 
                     className="photo"
                     src={`/images/travel/${foto.photo_name}`} />
                   <Button
                     variant="danger"
                     className="ms-5 me-5"
                     onClick={() => delImage(foto)}
                     > Eliminar</Button>

             </div>
             )
           })}
         </>
       )}
       <div className="d-flex align-items-center justify-content-center">
         <Button
           className="m-5"
           onClick={()=>setShowInput(!showInput)}
           >{!showInput ? "Add Image" : "Cancel"}
         </Button>

         {showInput && (
         <div>
           <input type="file" multiple onChange={handleFiles}></input>
           <Button type="submit" onClick={handleSubmit}>Guardar</Button>
         </div>)}

       </div>


     </div>
   );
};
