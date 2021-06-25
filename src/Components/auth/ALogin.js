import React,{ useState } from 'react'
import logo from '../../logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import '../../App.css';
import ANavbar from '../../Components/ANavbar';
import ADashboard from '../ADashboard';



const ALogin = () => {

    

    const [user,setUser] = useState({
        password:"",
    });

    const [state,setState]=useState({
        login:false
    });

    let name,value;
    const handleInputs = (e) => {
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
    }

    const login =async (e) => {
        e.preventDefault();
        
        
        if(user.password!=="admin123"){
            window.alert("You dont have permission to login in... ");
            setState({login:false})
        }else{
            window.alert("login successful");
            
        setState({login:true})
            
        }
    }

   

    return (
        <>
                    
        { !state.login ?
        <div>
        <div className="Navbar"><ANavbar/></div>
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
                        <h4 className="form-title pt-5">Login for Admin Only</h4>
                        <form className="login-form" id="login-form">                          
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
                        
                        
                    </div>
                                   
                </div> 
            </section>
            </div>
            </div>
            </div>
           :
            <div>
            <ADashboard/>
            </div>
}



        </>
    )
}

export default ALogin;
