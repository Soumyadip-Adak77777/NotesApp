import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Cookies from 'js-cookie';

const ViewNotes = () => {

    const [states, setStates] = useState([]); 

    const [userData, setUserData] = useState({
        role: "",
        _id: "",
        name: "",
        email: "",
        stream: "",
        semester: "",
        createdAt: ""
    });

    useEffect(() => {
        note();
    }, [])
    const note = async () => {

        

        const note = await fetch('/api/notes', {

            method: "GET",
           
        })
        const data2 = await note.json();
        console.log(data2)
        setStates(data2);
    }

    function download(notepath){
        var str=`${notepath}`.replace("http://localhost:3000/"," ").substring(1, 100);
        console.log(str);
        window.open(`${str}`, '_blank');
         
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
            <div>
                <h1>View Notes</h1>
                <section className="UploadNote DashboardSection">
                    <div className="container">
                        <div className="upload_form ">

                            <table className="table">
                                <thead className="table">
                                    <tr className="table-info">
                                        <th className="p-4" scope="col">Id</th>
                                        <th className="p-4" scope="col">Name</th>
                                        <th className="p-4" scope="col">Stream</th>
                                        <th className="p-4" scope="col">Semester</th>
                                        <th className="p-4" scope="col">Created At</th>
                                        <th className="p-4" scope="col">Download</th>
                                    </tr>
                                </thead>
                                { states.map((state,index)=>(state.semester===userData.semester && state.stream===userData.stream)?
                                <tbody>
                                    <tr>
                                        <td >{index+1}</td>
                                        <td>{state.name}</td>
                                        <td>{state.stream}</td>
                                        <td>{state.semester}</td>
                                        <td>{state.createdAt.split('T')[0]}</td>
                                        <td><input type="submit" name="UploadNote" id="UploadNote" className="form-submit  btn btn-outline-success" onClick={()=>download(state.notepath)} value="Download"/></td>
                                    </tr>
                                </tbody>
                                :<th></th>)}
                            </table>
                        </div>
                       
                    </div>
                </section>
            </div>
        </>
    )
}

export default ViewNotes
