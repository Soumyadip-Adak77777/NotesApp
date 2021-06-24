import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom' 
import 'bootstrap/dist/css/bootstrap.css'

const ViewProfile = () => {

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

    return (
        <>
            <div >
                <h1>View Profile</h1>
                <section className="UploadNote DashboardSection">
                    <div className="container">
                        <div className="upload_form ">
                            <div className="card text-dark border-info mb-3">
                                <div className="card-header"><h3>Profile as: </h3>{userData.role}</div>
                                <div className="card-body">
                                    <div className="card-text "><h3>Profile Name: </h3>{userData.name}</div>
                                    <div className="card-text "><h3>Mail id used: </h3> {userData.email}</div>
                                    <div className="card-text p-1"><h3>Id Created at: </h3>{userData.createdAt.split('T')[0]}</div>
                                    <div><Link to='/teditprofile'>Edit</Link></div>
                                </div>
                            </div>

                            
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

export default ViewProfile
