import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Admin } from '../pages/admin/Admin'
import { Login } from '../pages/Auth/Login'
import { Register } from '../pages/Auth/Register'
import { About } from '../pages/home/About'
import { AllUsers } from '../pages/home/AllUsers'
import { Home } from '../pages/home/Home'
import { Service } from '../pages/home/Service'
import { User } from '../pages/user/User'
import { EditUser } from '../pages/user/EditUser'
import { AdminUsers } from '../pages/admin/AdminUsers'
import { Travel } from '../pages/user/Travel'
import { AdminPictures } from '../pages/admin/AdminPictures'

export const AppRoutes = ({isLogged, setIsLogged}) => {
  return (
    <>
        <BrowserRouter>
          <NavBar isLogged={isLogged} setIsLogged={setIsLogged}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login setIsLogged={setIsLogged}/>}/>
            <Route path='/user/:id' element={<User />}/>
            <Route path='/allusers' element={<AllUsers/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/services' element={<Service />}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/adminUsers' element={<AdminUsers/>}/>
            <Route path='/adminPics' element={<AdminPictures/>}/>
            <Route path='/travel/:travel_id' element={<Travel />} />
            <Route path='/editUser/:id' element={<EditUser/>}/>

            <Route path='*' element={<Home/>}/>

          </Routes>
        </BrowserRouter>
    </>
  )
}
