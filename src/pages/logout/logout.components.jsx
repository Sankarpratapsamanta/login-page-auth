import React,{useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth.context';
import {useHistory} from "react-router-dom";
import './logout.styles.css'


const Logout = () => {

    const {getLoggedIn}=useContext(AuthContext)
    const history=useHistory()

    async function logout(){
        await axios.get("http://localhost:3000/logout")
        await getLoggedIn()
        history.push('/')
    }

    return(
        <div>
            <button className="form_input_btn" onClick={logout}>Logout</button>
        </div>
    )
}

export default Logout
