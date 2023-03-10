import './settings.css';
import React, {useState, useContext, useRef} from 'react';
import { Publish } from "@material-ui/icons";
import { Context, user } from '../../context/Context';
import { publicRequest, Pic } from '../../requestMethod';

export default function Settings() {
    const { user, dispatch } = useContext(Context);

    const [password, setPassword] = useState(null);
    const [cPassword, setcPassword] = useState(null);
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error,setError] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        const updateProfile = {
            password,
          }
          if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name",fileName);
            data.append("file",file);
            updateProfile.image = fileName;
            try {
                await publicRequest.post('/upload',data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await publicRequest.put(`/pharmacy/${user._id}`, updateProfile);
            if(password !== cPassword) {
              return alert("Password Not Match");
            }
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS",payload:res.data});
            // window.location.reload();
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
            dispatch({type: "UPDATE_FAILURE"});
        }
    }
  return (
    <div className='setting'>
        <h1>Update Profile ({user.pharmacyName})</h1>
        <div className="productBottom">
          <form className="productForm" onSubmit={handleUpdate}>
                <div className="productFormLeft">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder=''
                    required
                    onChange={e=>setPassword(e.target.value)}
                    pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                  />
                  {<span className="fv">Password should be 8-20 characters and <br /> includes at least 1 letter, 1 number and <br /> 1 special character</span>}
                </div>
                <div className="productFormLeft">
                  <label>Re-Type Password</label>
                  <input 
                    type="password" 
                    placeholder=''
                    required
                    onChange={e=>setcPassword(e.target.value)}
                    pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                  />
                  {<span className="fv">Password should be 8-20 characters and <br /> includes at least 1 letter, 1 number and <br /> 1 special character</span>}
                </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img 
                        src={file ? URL.createObjectURL(file):Pic+user.image} 
                        alt="" 
                        className="productUploadImg" />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input 
                        type="file" 
                        id="file" 
                        style={{display:"none"}}
                        onChange={e=>setFile(e.target.files[0])}
                      />
                  </div>
                  <button className="productButton ttw" type="submit">Update</button>
                  {success && (
                    <div className="success">
                    <p><strong>Success!</strong> Profile Updated...</p>
                  </div>
                  )}
                  {error && (
                    <div className="danger">
                    <p><strong>Error!</strong> {error}</p>
                  </div>
                  )}
              </div>
          </form>
      </div>
    </div>
  )
}
