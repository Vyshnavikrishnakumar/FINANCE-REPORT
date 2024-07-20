import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Admin from './components/Admin'
import Dashboard from './components/Dashboard'
import Add from './components/Add'
import Adminmanage from './components/Adminmanage'


function App() {
  return (
    <>
     {location.pathname !== '/f' && <Navbar />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/a" element={<Signup />} />
        <Route path="/b" element={<Admin />} />
        <Route path="/c" element={<Dashboard />} />
        <Route path="/d" element={<Add />} />
        <Route path="/f" element={<Adminmanage />} />
      
      </Routes>
    {/* <Route path="/f" element={<Adminmanage />} /> */}
      {/* <Admin/> */}
    </>
  );
}

export default App
