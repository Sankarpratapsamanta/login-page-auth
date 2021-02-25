import React,{useState,useContext} from 'react';
import axios from 'axios';

import { Link ,useHistory} from "react-router-dom";
import './login.styles.css';
import AuthContext from '../../context/auth.context';



const Login=()=>{
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const {getLoggedIn} = useContext(AuthContext)
    const history=useHistory()

    async function login(e){
        e.preventDefault()

        try {
            const loginData={
                email,password
            };
            await axios.post('http://localhost:3000/login',loginData)
            await getLoggedIn()
            history.push("/home")
        } catch (error) {
           
            console.error({error:"something wents wrong"})
        }
    } 

    return(
        <div>
            <h1 className='register_heading'>LOGIN</h1>

            <div className="form_content">
                <form  className='form' onSubmit={login}>
                    <input  className='form_input' type="email" placeholder="johnDoe@xyz.com" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    <input  className='form_input' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    <button className="form_input_btn" type="submit">SUBMIT</button>
                </form>
                <div className="register_link">I don't have an account ?  <br/>
                   <Link to="/register">Register</Link>
                </div>
                
            </div>
        </div>
    )
}

export default Login