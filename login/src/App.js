import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import Register from './components/pages/RegisterPage'
import HomePage from './components/pages/HomePage'
import Navbar from "./components/pages/Navbar";
import MapPage from './components/pages/MapPage'; 
import ListStudioPage from './components/pages/ListStudioPage'; 
import ListClassPage from './components/pages/ListClassPage'; 
import ListClassSchedule from './components/pages/ListClassSchedule'; 
import ListClassHistory from './components/pages/ListClassHistory'; 
import AuthNavbar from "./components/pages/AuthNavbar";
import Profile from './components/pages/Profile'
import Payment from './components/pages/Payment'
import PaymentMethod from './components/pages/PaymentMethod'
import './App.css'
import { useLoadScript } from "@react-google-maps/api";
import { useGeolocation } from 'react-use';
import PaymentFuture from './components/pages/PaymentFuture'
import StudioSubscribe from './components/pages/StudioSubscribe'
import CurrentSubscription from './components/pages/CurrentSubscription'
import StudioSearchingName from './components/pages/StudioSearching/StudioSearchingName'
import StudiosFiltering from './components/pages/StudioFiltering/Studios'



export default function App() {

    const token = localStorage.getItem('token');
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDJAhX6YYDywP07OoL6CpD_OE0iMGJNOcY" // Add your API key
      });

    localStorage.setItem("lat",useGeolocation().latitude);
    localStorage.setItem("long",useGeolocation().longitude);

    return (
        <Router>
            <div>
            {token? <AuthNavbar/>: <Navbar/>}
                <Routes>
                    <Route exact path="/" element={<LandingPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/home" element={<Profile/>} />
                    <Route path="/payment/history" element={<Payment/>} />
                    <Route path="/payment/future" element={<PaymentFuture/>} />
                    <Route path="/card/update/" element={<PaymentMethod/>} />
                    <Route path='/map' element={isLoaded ? <MapPage /> : null}/>
                    <Route path='/studioList' element={<ListStudioPage />} />
                    <Route path='/studiosubscribe' element={<StudioSubscribe />} />
                    <Route path='/currentsubscribe' element={<CurrentSubscription />} />
                    <Route path='/studioSearchingName' element={<StudioSearchingName />} />
                    <Route path='/class/schdeule' element={<ListClassSchedule />} />
                    {/* <Route path='/class/history' element={<ListClassHistory />} /> */}
                </Routes>
            </div>
        </Router>
    )
}