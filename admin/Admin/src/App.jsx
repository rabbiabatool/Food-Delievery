import React from 'react'
import './App.css'
import {Routes,Route} from "react-router-dom";
import Admin from './pages/Admin/Admin';
import Navbar from './components/Navbar/Navbar';
// import Add_Product from './pages/Add_Product';


function App() {
 
  return (
    <div className="app">
      <Navbar />
      <Admin />
    </div>
      
  );
}

export default App
