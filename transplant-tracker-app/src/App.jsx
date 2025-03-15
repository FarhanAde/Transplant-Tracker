// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import React from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/pages/Home"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Patients from './components/pages/Patients'
import Donors from './components/pages/Donors'
import Hospitals from './components/pages/Hospitals'
import ContactUs from './components/pages/ContactUs'
import LiveTracker from './components/pages/LiveTracker'
import PatientRecords from './components/pages/patients_pages/PatientRecords'
import Urgency from './components/pages/patients_pages/Urgency'
import DonorRecords from './components/pages/donors_pages/DonorRecords'
import Demand from './components/pages/donors_pages/Demand'


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/patients" element={<Patients/>}/>
        <Route path="/donors" element={<Donors/>}/>
        <Route path="/hospitals" element={<Hospitals/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/live-tracker" element={<LiveTracker/>}/>
        <Route path="/patients/patient-records" element={<PatientRecords/>}/>
        <Route path="/patients/urgency" element={<Urgency/>}/>
        <Route path="/donors/donor-records" element={<DonorRecords/>}/>
        <Route path="/donors/demand" element={<Demand/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
