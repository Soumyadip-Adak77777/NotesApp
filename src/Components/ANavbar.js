import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import img from '../images/logo-intro.png'


const ANavbar = () => {
    return (
        <>
         
            <nav className="navbar navbar-expand-lg  fixed-top  d-flex navbar-light bg-info ">
                
                     <div className="me-auto p-2">    
                        <img src={img} height="40px" width="40px" className="m-1" alt="TIG-MAIN"></img>
                        <a className="navbar-brand pl-2" href="/">Techno Main, Salt Lake</a>
                       
                        </div>   
            </nav>
            
        </>
    )
}

export default ANavbar;
