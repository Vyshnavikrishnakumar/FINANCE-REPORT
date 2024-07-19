import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Admin from './components/Admin'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/a" element={<Signup />} />
        <Route path="/b" element={<Admin />} />
        <Route path="/c" element={<Dashboard />} />

      </Routes>
      {/* <Admin/> */}
    </>
  );
}

export default App
