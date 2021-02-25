import React,{useState,useContext} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AuthContext from '../../context/auth.context';

import './register.styles.css';

const Register=()=>{

    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [gender, setGender]=useState("");
    // const [date, setDate]=useState("");
    const [password, setPassword]=useState("");
    const {getLoggedIn} = useContext(AuthContext)

    const history=useHistory()

    async function register(e){
        e.preventDefault()

        try {
            const registerData={
                name,email,gender,password
            };
            await axios.post('http://localhost:3000/',registerData)
            await getLoggedIn()
            history.push('/home')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <h1 className='register_heading'>REGISTER A NEW ACCOUNT</h1>
            <div className="form_content">
                <form  className='form' onSubmit={register}>
                    <input  className='form_input' type="text" placeholder="John Doe" onChange={(e)=>setName(e.target.value)} value={name}/>
                    <input  className='form_input' type="email" placeholder="johnDoe@xyz.com" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    <select className='form_input' onChange={(e)=>setGender(e.target.value)} value={gender}>
                    <option value="" disabled selected>Choose your option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>                            
                    </select>
                    {/* <input  className='form_input' type="text" placeholder="yyyy-mm-dd" onChange={(e)=>setDate(e.target.value)} value={date} /> */}
                    <input  className='form_input' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    <button className="form_input_btn" type="submit">SUBMIT</button>
                </form>

            </div>
        </div>
    )
}

export default Register