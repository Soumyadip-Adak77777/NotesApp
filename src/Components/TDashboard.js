import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Cookies from 'js-cookie'
// import Auth from '../ProtectedRoute/Auth';
import UploadNotes from './teacher/UploadNotes'
import UpdateNotes from './teacher/UpdateNotes'
import ViewNotes from './teacher/ViewNotes'
import ViewProfile from './teacher/ViewProfile'
import EditProfile from './teacher/EditProfile'


const TDashboard = (props) => {
    console.log(props);

    const [userData, setUserData] = useState({
        role: "",
        _id: "",
        name: "",
        email: "",
        createdAt: ""
    });

    const refresh = async () => {
        //const a = Cookies.get("access");
        const r = Cookies.get("refresh");
        const res = await fetch('/api/trefresh', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refresh_token: r
            })
        });
        const data = await res.json();
        const b = data.access_token;
        const c = data.refresh_token;
        Cookies.set("access", b);
        Cookies.set("refresh", c);
        console.log("Session Refreshed")

    }

    useEffect(async () => {

        setInterval(refresh, 1000 * 59);


    }, [])
    // const email = Cookies.get("email");

    // const student = Student.findOne({email:email});



    const logout = async (e) => {
        e.preventDefault();

        const access_token = Cookies.get("access");
        const refresh = Cookies.get("refresh");


        const res = await fetch('/api/tlogout', {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify({
                refresh_token: refresh
            })
        })
        const data = await res.json();
        console.log(data);
        if (data.status === 1) {
            window.alert("logout success");
            window.location.replace("/")
        }
        else {
            if (data.message === "You dont have proper access!") {
                const res = await fetch('/api/trefresh', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        refresh_token: refresh
                    })
                });
                const data = await res.json();
                const access_token = data.access_token;
                const refresh_token = data.refresh_token;
                Cookies.set("access", access_token);
                Cookies.set("refresh", refresh_token);
            }
            else
                window.alert("logout unsuccess");
        }
    };


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
        <Router>
            <div>
                <nav className="navbar navbar-light bg-info">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Welcome {userData.name}</a>
                        <form className="d-flex">
                            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                        </form>
                    </div>
                </nav>
            </div>
            <div>
                <ul class="nav nav-tabs">
                    <li className="nav-item">
                        <Link className="nav-link"  aria-current="page" to="/tuploadnotes"><i className="zmdi zmdi-upload"></i> Upload Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tupdatenotes"><i className="zmdi zmdi-wrench"></i> Update Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tviewnotes"><i className="zmdi zmdi-file-text"></i> View Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tviewprofile"> <i className="zmdi zmdi-account"></i> View Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/teditprofile"><i className="zmdi zmdi-edit"></i> Edit Profile</Link>
                    </li>
                </ul>
            </div>
            <div className="WorkingArea App">
                <Switch>
                    <Route exact path="/tuploadnotes" component={UploadNotes} />
                    <Route  path="/tupdatenotes" component={UpdateNotes} />
                    <Route  path="/tviewnotes" component={ViewNotes} />
                    <Route  path="/tviewprofile" component={ViewProfile} />
                    <Route  path="/teditprofile" component={EditProfile} />
                </Switch>
                
            </div>
            </Router>
        </>
    )
}

export default TDashboard;
