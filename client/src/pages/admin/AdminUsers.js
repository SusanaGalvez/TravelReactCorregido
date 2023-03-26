import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button } from '@mui/material';

export const AdminUsers = () => {

    const [users, setUsers] = useState();

    useEffect(() => {
      axios
        .get('http://localhost:4000/admin/getAllUsers')
        .then((res)=>{
            console.log(res.data);
            setUsers(res.data);
        })
    }, [])
    
    const handleEdit =(id, isdeleted)=>{

        console.log("este es id", id);
        console.log("este es isdeleted", isdeleted);
        let url=`http://localhost:4000/admin/desableUser/${id}`;
        
        if(isdeleted === 1){
            url=`http://localhost:4000/admin/enableUser/${id}`
        }

        axios
            .put(url)
            .then((res)=>{
                console.log(res.data);
                setUsers(res.data)
            })
            .catch((error)=>{
                console.log(error);
            })


    }

 
  return (

<div>
   {users && 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre del usuario</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Dirección</TableCell>
            <TableCell align="right">teléfono</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Is_Deleted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.lastename}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.is_deleted}</TableCell>
              <TableCell align='center'>
                  <Button
                    variant='contained'
                    onClick={()=>handleEdit(user.user_id, user.is_deleted)}
                            >{user.is_deleted === 0 ? "Desable":"Enable"}</Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
 </div> );
}
