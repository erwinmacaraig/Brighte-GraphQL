import React from 'react';
import logo from './logo.svg';
import './App.css';
import SurveyForm from './pages/SurveyForm/SurveyForm';
import Leads from './pages/Leads/Leads';

function App() {
  return (
    <div className='container'>      
      <SurveyForm />
      <Leads />
    </div>
  );
}

export default App;
