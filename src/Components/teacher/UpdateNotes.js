import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
const UpdateNotes = () => {
    return (
        <div className="p-3 ">
            <h1>Update Notes</h1>
            <section className="TLogin">
                <div className="container">
                    <div className="login-form">
                        <h4 className="form-title pt-5">Login for Teachers</h4>
                        <form method="POST" className="login-form" id="login-form">
                            <div className="form-group pt-5">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-files-text"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="email" name="email" id="email" autoComplete="off"  placeholder="Your Email"/>
                            </div>
                            <div className="form-group pt-2">
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-lock"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="password" name="password" id="password" autoComplete="off"  placeholder="Your Password"/>
                            </div>
                            <div className="form-group form-button pt-4 pl-8">
                                <input type="submit" name="TLogin" id="TLogin" className="form-submit  btn btn-outline-success" value="Login"/>
                            </div>
                        </form>
                        
                        <div className="pt-4">
                            {/* {userData && <h5 style={{ color: 'red' }}>Error: {userData.message}</h5>} */}
                        </div>
                    </div>
                                   
                </div> 
            </section>
        </div>
    )
}

export default UpdateNotes
