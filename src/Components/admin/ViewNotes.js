import React,{useState,useEffect} from 'react'

import 'bootstrap/dist/css/bootstrap.css'

const ViewNotes = () => {

    const [states, setStates] = useState([]); 

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

      const deleteNote= async (id,name) => {

       
       
        const res = await fetch(`/api/note/${id}`, {

            method: "DELETE",
           
           
        })
        const data2 = await res.json();
        if(data2.message){
            window.alert(data2.message);
        }else{
            window.alert(name+" Deleted successfully");
        }
        
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
                                        <th className="p-4" scope="col">Delete</th>
                                    </tr>
                                </thead>
                                {  states.map((state,index)=>
                                <tbody>
                                    <tr>
                                        <td >{state._id}</td>
                                        <td>{state.name}</td>
                                        <td>{state.stream}</td>
                                        <td>{state.semester}</td>
                                        <td>{state.createdAt.split('T')[0]}</td>
                                        <td><input type="submit" name="UploadNote" id="UploadNote" className="form-submit  btn btn-outline-success" onClick={()=>download(state.notepath)} value="Download"/></td>
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

export default ViewNotes
