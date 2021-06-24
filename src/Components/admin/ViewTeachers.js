import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Cookies from 'js-cookie';
const ViewTeachers = () => {

    const [states, setStates] = useState([]); 

    useEffect(() => {
        note();
    }, [])
    const note = async () => {

        

        const note = await fetch('/api/teachers', {

            method: "GET",
           
        })
        const data2 = await note.json();
        console.log(data2)
        setStates(data2);
    }

    const deleteNote= async (id,name) => {

        const access=Cookies.get("access");
        console.log(access,id);
        const res = await fetch(`/api/teachers/${id}`, {

            method: "DELETE",
           
           
        })
        const data2 = await res.json();
        if(data2.message){
            window.alert(data2.message);
        }else{
            
            window.alert(name+" Deleted successfully");
        }
        
    }

    const updateNote= async (id) => {
        Cookies.set("teacherid",id);
        
    }




    return (
        <>
            <div>
                <h1>View Teachers</h1>
                <section className="UploadNote DashboardSection">
                    <div className="container">
                        <div className="upload_form ">

                            <table className="table">
                                <thead className="table">
                                    <tr className="table-info">
                                        <th className="p-4" scope="col">Id</th>
                                        <th className="p-4" scope="col">Name</th>           
                                        <th className="p-4" scope="col">Created At</th>
                                        <th className="p-4" scope="col">Edit</th>
                                        <th className="p-4" scope="col">Delete</th>
                                    </tr>
                                </thead>
                                {  states.map((state,index)=>
                                <tbody>
                                    <tr>
                                        <td >{state._id}</td>
                                        <td>{state.name}</td>
                                        <td>{state.createdAt.split('T')[0]}</td>
                                        <td><Link to="/aeditteachers" name="UploadNote" id="UploadNote" className="form-submit  btn btn-outline-primary" onClick={()=>updateNote(state._id)}>Edit</Link></td>
                                        <td><input type="submit" name="UploadNote" id="UploadNote" className="form-submit  btn btn-outline-danger" onClick={()=>deleteNote(state._id,state.name)} value="Delete"/></td>
                                    </tr>
                                </tbody>
                                   )}
                            </table>
                        </div>
                        
                    </div>
                </section>
                
            </div>
        </>
    )
}

export default ViewTeachers
