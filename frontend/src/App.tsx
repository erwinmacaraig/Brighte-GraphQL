import React from 'react';
import { Link, Route, Routes } from "react-router-dom";

import './App.css';
import SurveyForm from './pages/SurveyForm/SurveyForm';
import Leads from './pages/Leads/Leads';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className='container'>   
      <Navigation />
      <Routes>
        <Route path="/" element={<SurveyForm />} />
        <Route path="/leads" element={<Leads />} />
      </Routes>   
      
      
    </div>
  );
}

export default App;
