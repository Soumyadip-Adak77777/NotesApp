
import React,{ useState } from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import logo from '../../logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import '../../App.css';
import Navbar from '../../Components/Navbar';


const TRegister = () => {

    const history = useHistory();


    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirm_password:"",
    });

    const [userData,setUserData]=useState();

    let name,value;
    const handleInputs = (e) => {
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
    }

    

    const postData = async (e) =>{
        e.preventDefault();
        const {name,email,password,confirm_password} = user;
        const res = await fetch("/api/tregister",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name:name,email:email,password:password,confirm_password:confirm_password
            })
        });

        const data = await res.json();
        
        setUserData(data);

        if( data.message ){
            console.log(data.message);
           
            
        }else{
            window.alert("Registered!!");
            console.log("success");
            history.push("/tlogin");
        }
        
    }

    return (
        <>
        <div className="Navbar"><Navbar/></div>
      <div className="App row">
        <div className="First col-1">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h3>Welcome To <br/>Online Notes Repository</h3>
          </header>
        </div>
        <div className="Second col-1 pt-5 m-3">
            <section className="TRegister">
                <div className="container">
                    <div className="signup-form">
                        <h4 className="form-title pt-5">Registration for Teachers</h4>
                        <form className="register-form" id="register-form">
                            <div className="form-group pt-5">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-account"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="text" name="name" id="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your Name"/>
                            </div>
                            <div className="form-group pt-2">
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
                            <div className="form-group pt-2">
                                <label htmlFor="conf_password">
                                    <i className="zmdi zmdi-lock"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="password" name="confirm_password" id="confirm_password" autoComplete="off" value={user.confirm_password} onChange={handleInputs} placeholder="Confirm Your Password"/>
                            </div>
                            
                            <div className="form-group form-button pt-4 pl-8">
                                <input type="submit" name="TRegister" id="TRegister" className="form-submit btn btn-outline-primary " onClick={postData} value="Register"/>
                            </div>
                        </form>
                        <div className="pt-3">
                        <NavLink to="/tlogin">Already have an account?</NavLink> 
                        </div>
                       
                        <div className="pt-4">
                            {userData && <h5 style={{ color: 'red' }}>Warning: {userData.message}</h5>}
                        </div>
                    </div>
                                   
                </div> 
            </section>
            </div>
            </div>
        </>
    )
}

export default TRegister;
