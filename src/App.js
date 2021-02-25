import React from 'react';
import axios from "axios";
import './App.css';
import Router from './route'
import {AuthContextProvider} from './context/auth.context';
axios.defaults.withCredentials=true

function App() {



  return (
    <div className="App">
      <AuthContextProvider>
        <Router/>
      </AuthContextProvider>
    </div> 
  );
}

export default App;
