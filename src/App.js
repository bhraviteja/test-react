import logo from './logo.svg';
import './App.css';
import Dashboard from './Employee/Dashboard';

import {Routes , Route } from "react-router-dom"
import InsetForm from './Employee/InsetForm';
import Update from './Employee/Update';


function App() {
  return (
    <div className='container'>
    
     <Routes> 
            <Route path="/" exact element={<Dashboard/>} /> 
            <Route path="/insertform" exact element={<InsetForm/>} /> 
            <Route path="/update/:id"  element={<Update/>} /> 

           
       </Routes> 
    </div>
  );
}

export default App;
