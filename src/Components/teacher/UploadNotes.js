import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css'
import Cookies from 'js-cookie';


const UploadNotes = () => {
    const history = useHistory();

    const [note,setNote] = useState({
        name:"",
        stream:"",
        semester:"",
        author:"",
        notepath:"",
        
    });

    const [state, setState] = useState({
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
        setState(data2);
    }

    const [userData,setUserData]=useState();

    let name,value;
    const handleInputs = (e) => {
        name=e.target.name;
        value=e.target.value;
        setNote({...note,[name]:value});
    }

    
    const postData = async (e) =>{
        e.preventDefault();
        const {name,stream,semester,notepath} = note;
        
        const inputFile=document.getElementById("notepath");
        const formData=new FormData();
        formData.append("name",name);
        formData.append("stream",stream);
        formData.append("semester",semester);
        formData.append("author",state.name);
        formData.append("notepath",inputFile.files[0]);
        

        const access=Cookies.get("access");
        // const {name,stream,semester,author,notepath} = note;
        // formData.append('name':name);

        

        const res = await fetch("/api/notes",{
            method:"POST",
            headers:{
            //     "Content-Type" : "multipart/form-data",boundary="----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
                "Authorization":`Bearer ${access}`
            },
            body:formData
            
        });
        

        const data = await res.json();

        setUserData(data);

        if( data.message ){
            console.log(data.message);
        }else{
            window.alert("Uploaded!!");
            console.log("success");
            
        }
    }
    return (
        <>
        <div>
            <h1>Upload Notes</h1>
            <section className="UploadNote DashboardSection">
                <div className="container">
                    <div className="upload_form p-5">
                        <form method="POST" className="upload_form" id="upload_form">
                            <div className="form-group pt-2">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-file-text"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="text" name="name" id="name" autoComplete="off" value={note.name} onChange={handleInputs}  placeholder="Name for the note"/>
                            </div>
                            <div className="form-group pt-5">
                                <label htmlFor="stream">
                                    <i className="zmdi zmdi-case"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="text" name="stream" id="stream" autoComplete="off" value={note.stream} onChange={handleInputs} placeholder="For Stream(Eg:MCA)"/>
                            </div>
                            <div className="form-group pt-5">
                                <label htmlFor="semester">
                                    <i className="zmdi zmdi-book"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="text" name="semester" id="semester" autoComplete="off"  value={note.semester} onChange={handleInputs} placeholder="For Semester(Eg:6)"/>
                            </div>
                            <div className="form-group">
                                <input className="border border-info shadow bg-body rounde" type="hidden" name="author" id="author" autoComplete="off" value={state.name} onChange={handleInputs} />
                            </div>
                            <div className="form-group pt-5 pl-5">
                                <label htmlFor="notepath">
                                    <i className="zmdi zmdi-file"></i>
                                </label> 
                                <input className="border border-info shadow bg-body rounde" type="file" name="notepath" id="notepath" autoComplete="off"  value={note.notepath} onChange={handleInputs} placeholder="Upload the note"/>
                            </div>
                            <div className="form-group form-button pt-4 pl-8">
                                <input type="submit" name="UploadNote" id="UploadNote" className="form-submit  btn btn-outline-primary" onClick={postData} value="Upload"/>
                            </div>
                        </form>
                        
                        <div className="pt-4">
                            {userData && <h5 style={{ color: 'red' }}> {userData.message}</h5>}
                        </div>
                    </div>
                                   
                </div> 
            </section>
        </div>
        </>
    )
}

export default UploadNotes
