import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.css'

const UpdateNotes = () => {

    const [noteData, setNoteData] = useState({
        _id: "",
        name: "",
        stream: "",
        semester:"",
        author:"",
    });

    useEffect(() => {
        note();
    }, [])
    const note = async () => {

        const id = Cookies.get("note");

        const user = await fetch(`/api/note/${id}`, {

            method: "GET",
            
        })
        const data2 = await user.json();
        console.log(data2)
        setNoteData(data2);
    }

    const [userInp,setUserInp] = useState({
        name:noteData.name,
        stream:noteData.stream,
        semester:noteData.semester,
        author:noteData.author,      
    });

    let name,value;
    const handleInputs = (e) => {
        name=e.target.name;
        value=e.target.value;
        setUserInp({...userInp,[name]:value});
    }


    

    const postData =  async (e) => {
        e.preventDefault();
        const {name,stream,semester} = userInp;
        const {_id,author} = noteData;
        const formData=new FormData();
        formData.append("name",name);
        formData.append("stream",stream);
        formData.append("semester",semester);
        formData.append("author",author);

        const access=Cookies.get("access");

        const note2 = await fetch(`/api/notes/${_id}`, {

            method: "PUT",
            headers: {
                "Authorization": `Bearer ${access}`
            },
            body:formData
        });
        const data2 = await note2.json();
        console.log(data2)
        setNoteData(data2);
        if(data2.message){
            window.alert(data2.message);
        }else{
            window.alert("Note updated successfully");
        }
    }


    return (
        <>
            <div >
                <h1>Edit the Note</h1>
                <section className="UploadNote DashboardSection">
                <form method="PUT" className="UpdateProfile" id="UpdateProfile" onSubmit={postData}>
                    <div className="container">
                        <div className="upload_form d-flex">
                            <div className="card text-dark border-info mb-3">
                                <div className="card-header"><h3>Note details</h3></div>
                                    <div className="card-text pt-2"><h3>Note Title: </h3>{noteData.name}</div>
                                    <div className="card-text "><h3>For Stream: </h3>{noteData.stream}</div>
                                    <div className="card-text "><h3>For Semester: </h3>{noteData.semester}</div>
                                    <div className="card-text pb-4"><h3>Note Author: </h3>{noteData.author}</div>
                                </div>
                            <div className="card text-dark border-info mb-3">
                                <div className="card-header"><h3>Changes to be done:</h3></div>
                                <div className="card-body">
                                    <div className="card-text "><h3>Note Title: </h3>
                                    <input className="border border-info shadow bg-body rounde" type="text" name="name" id="name" autoComplete="off" value={userInp.name} onChange={handleInputs}  placeholder="Name for the note" required/>
                                    </div>
                                    <div className="card-text "><h3>For Stream: </h3>
                                    <input className="border border-info shadow bg-body rounde" type="text" name="stream" id="stream" autoComplete="off" value={userInp.stream} onChange={handleInputs}  placeholder="Stream for the note" required/>
                                    </div>
                                    <div className="card-text "><h3>For Semester: </h3>
                                    <input className="border border-info shadow bg-body rounde" type="text" name="semester" id="semester" autoComplete="off" value={userInp.semester} onChange={handleInputs}  placeholder="Semester for the note" required/>
                                    </div>
                                    <input className="border border-info shadow bg-body rounde" type="hidden" name="author" id="author" autoComplete="off" value={noteData.author} onChange={handleInputs}  />
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

export default UpdateNotes