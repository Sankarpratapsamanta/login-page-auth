import React,{useContext} from 'react'
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Login from "./pages/login/login.components";
import Register from './pages/register/register.components'
import Home from "./pages/home/home.components";
import AuthContext from './context/auth.context';

function Router() {

    const {loggedIn}=useContext(AuthContext)
    console.log(loggedIn)
    return (
        <BrowserRouter>
          <Switch>
            {loggedIn === false && (
                <>
                    <Route exact path='/'><Login/></Route>
                    <Route path='/register' ><Register/></Route>
                </>
            )}
            {loggedIn === true && <Route  path='/home'><Home/></Route>}
            
          </Switch>
        </BrowserRouter>
    )
}

export default Router
