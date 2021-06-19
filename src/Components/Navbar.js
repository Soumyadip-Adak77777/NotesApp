import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import img from '../images/logo-intro.png'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
         
            <nav className="navbar navbar-expand-lg  fixed-top  d-flex navbar-light bg-info ">
                
                     <div className="me-auto p-2">    
                        <img src={img} height="40px" width="40px" className="m-1" alt="TIG-MAIN"></img>
                        <a className="navbar-brand pl-2" href="/">Techno Main, Salt Lake</a>
                       
                        </div>   
                        
                       <div className="p-2">
                       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto " >
                                <li className="nav-item dropdown ">
                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Are you Teacher?
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><NavLink className="dropdown-item" to="/tregister">Registration</NavLink ></li>
                                        <li><NavLink  className="dropdown-item" to="/tlogin">Login</NavLink ></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Are you Student?
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><NavLink  className="dropdown-item" to="/sregister">Registration</NavLink ></li>
                                        <li><NavLink  className="dropdown-item" to="/slogin">Login</NavLink ></li>
                                    </ul>
                                </li>
                            </ul>
                            
                        </div>
                        
                       </div> 
                   
            </nav>
            
        </>
    )
}

export default Navbar;
