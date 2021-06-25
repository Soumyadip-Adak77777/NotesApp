import React from 'react'
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import EditStudent from './admin/EditStudent';
import EditTeacher from './admin/EditTeacher';
import ViewNotes from './admin/ViewNotes';
import ViewStudents from './admin/ViewStudents';
import ViewTeachers from './admin/ViewTeachers';

const ADashboard = () => {

   


    return (
        
            <>
        <Router>
            <div>
                <nav className="navbar navbar-light bg-info">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Welcome Admin</a>
                        <form className="d-flex">
                        <a className="btn btn-outline-danger" href="/"  >Logout</a>
                        </form>
                    </div>
                </nav>
            </div>
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className="nav-link" to="/aviewteachers"> <i className="zmdi zmdi-accounts"></i> View Teachers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/aviewstudents"><i className="zmdi zmdi-accounts-alt"></i> View Students</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/aviewnotes"><i className="zmdi zmdi-file-text"></i> View Notes</Link>
                    </li>
                </ul>
            </div>
            <div className="WorkingArea App">
                <Switch>
                    <Route exact path="/aviewteachers" component={ViewTeachers} />
                    <Route  path="/aviewstudents" component={ViewStudents} />
                    <Route  path="/aviewnotes" component={ViewNotes} />
                    <Route  path="/aeditteachers" component={EditTeacher} />
                    <Route  path="/aeditstudents" component={EditStudent} />
                </Switch>
                
            </div>
            </Router>
        </>
        
    )
}




export default ADashboard

