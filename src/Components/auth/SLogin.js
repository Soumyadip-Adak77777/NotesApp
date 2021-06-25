import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import logo from '../../logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import '../../App.css';
import Navbar from '../../Components/Navbar';
import SDashboard from '../SDashboard';



const SLogin = (props) => {

    

    const [user,setUser] = useState({
        email:"",
        password:"",
    });

    const [state,setState]=useState({
        login:false
    });

    const [userData,setUserData]=useState();

    let name,value;
    const handleInputs = (e) => {
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
    }

    const login =async (e) => {
        e.preventDefault();
        const {email,password} = user;
        const res = await fetch('/api/slogin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email:email,password:password
            })
        });

        const data=await res.json();
        console.log(data)
        const {access_token,refresh_token}=data;

        Cookies.set("access",access_token);
        Cookies.set("refresh",refresh_token);
        Cookies.set("email",email);
        setUserData(data);
        
        if(data.message ){
            
            console.log(data);
        }else{
            window.alert("login successful");
            
               
        setState({login:true})
            
        }
    }

    

    return (
        <>
                    
        { !state.login ?
        <div>
        <div className="Navbar"><Navbar/></div>
      <div className="App row">
        <div className="First col-1">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h3>Welcome To <br/>Online Notes Repository</h3>
          </header>
        </div>
        <div className="Second col-1 pt-5 m-3">
            <section className="SLogin">
                <div className="container">
                    <div className="login-form">
                        <h4 className="form-title pt-5">Login for Students</h4>
                        <form className="login-form" id="login-form">
                            <div className="form-group pt-5">
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="email" name="email" id="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Your Email"/>
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-lock"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="password" name="password" id="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Your Password"/>
                            </div>
                            <div className="form-group form-button pt-4 pl-8">
                                <input type="submit" name="SLogin" id="SLogin" className="form-submit btn btn-outline-success" onClick={login} value="Login"/>
                            </div>
                        </form>
                        <div className="pt-3">
                        <NavLink to="/sregister">Don't have any account?</NavLink> 
                        </div>
                        <div className="pt-4">
                            {userData && <h5 style={{ color: 'red' }}>Warning : {userData.message}</h5>}
                        </div>
                    </div>
                                   
                </div> 
            </section>
            </div>
            </div>
            </div>
           :
            <div>
            <SDashboard/>
            </div>
}



        </>
    )
}

export default SLogin;
