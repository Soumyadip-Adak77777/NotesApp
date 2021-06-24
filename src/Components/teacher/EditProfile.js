import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.css'

const EditProfile = () => {

    const [userData, setUserData] = useState({
        role: "",
        _id: "",
        name: "",
        email: "",
        createdAt: ""
    });

    useEffect(() => {
        user();
    }, [])
    const user = async () => {

        const access = Cookies.get("access");

        const user = await fetch('/api/teacher', {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access}`
            }
        })
        const data2 = await user.json();
        console.log(data2)
        setUserData(data2);
    }

    const [userInp,setUserInp] = useState({
        name:userData.name,      
    });

    let name,value;
    const handleInputs = (e) => {
        name=e.target.name;
        value=e.target.value;
        setUserInp({...userInp,[name]:value});
    }


    

    const postData =  async (e) => {
        e.preventDefault();
        const {name} = userInp;
        const {_id} = userData;
        const user = await fetch(`/api/teachers/${_id}`, {

            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name:name,
            })
        })
        const data2 = await user.json();
        console.log(data2)
        setUserData(data2);
        if(data2.message){
            window.alert(data2.message);
        }else{
            window.alert("Profile updated successfully");
        }
    }


    return (
        <>
            <div >
                <h1>Edit Profile</h1>
                <section className="UploadNote DashboardSection">
                <form method="PUT" className="UpdateProfile" id="UpdateProfile" onSubmit={postData}>
                    <div className="container">
                        <div className="upload_form d-flex">
                            <div className="card text-dark border-info mb-3">
                                <div className="card-header"><h3>Profile as: </h3>{userData.role}</div>
                                <div className="card-body">
                                    <div className="card-text "><h3>Profile Name: </h3>{userData.name}</div>
                                </div>
                            </div>
                            <div className="card text-dark border-info mb-3">
                            
                                <div className="card-header"><h3>Changes</h3>to be done:</div>
                                <div className="card-body">
                                    <div className="card-text "><h3>Profile Name: </h3>
                                    <input className="border border-info shadow bg-body rounde" type="text" name="name" id="name" autoComplete="off" value={userInp.name} onChange={handleInputs}  placeholder="Name for the note" required/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <input type="submit" name="UpdateProfile" id="UpdateProfile" className="form-submit  btn btn-outline-primary"  value="Confirm Change"/>
                    </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default EditProfile