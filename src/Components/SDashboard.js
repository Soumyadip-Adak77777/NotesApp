import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Cookies from 'js-cookie'
// import Auth from '../ProtectedRoute/Auth';
import ViewNotes from './student/ViewNotes'
import ViewProfile from './student/ViewProfile'
import EditProfile from './student/EditProfile'




const SDashboard = (props) => {
    console.log(props);

    const [userData, setUserData] = useState({
        role: "",
        _id: "",
        name: "",
        email: "",
        stream: "",
        semester: "",
        createdAt: ""
    });

    const refresh = async () => {
        //const a = Cookies.get("access");
        const r = Cookies.get("refresh");
        const res = await fetch('/api/srefresh', {
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


        const res = await fetch('/api/slogout', {

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
                const res = await fetch('/api/srefresh', {
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

        const user = await fetch('/api/student', {

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
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className="nav-link"  aria-current="page" to="/sviewnotes"><i className="zmdi zmdi-file-text"></i> View Notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sviewprofile"><i className="zmdi zmdi-account"></i> View Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/seditprofile"><i className="zmdi zmdi-edit"></i> Edit Profile</Link>
                    </li>
                </ul>
            </div>
            <div className="WorkingArea">
            <Switch>
                <Route exact path="/sviewnotes" component={ViewNotes}/>
                <Route exact path="/sviewprofile" component={ViewProfile} />
                <Route exact path="/seditprofile" component={EditProfile} />
            </Switch>
                
            </div>
            </Router>
        </>
    )
}

export default SDashboard;
