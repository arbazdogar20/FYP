import './contact.css'
import React,{useState, useEffect, useContext} from 'react'
import { Context } from '../../context/Context';
import { publicRequest } from '../../requestMethod';

export default function Contact() {

    const {user} = useContext(Context);
    console.log(user);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = {
            name: user.pharmacyName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            who: "Pharmacy",
            image: user.image,
            message
        }
        try {
            const res = await publicRequest.post('/contact/send-message',newMessage);
            alert(res.data.message);
            window.location.replace('/');
        } catch (error) {
            alert(error.response.data.message);
        }
    }

  return (
    <div className='contact'>
        <div className="newProduct" style={{marginLeft: 300, marginTop: 120}}>
      <h1 className="addProductTitle" style={{marginLeft: 18}}>Contact Admin</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        {/* <div className="addProductItem">
          <label>Pharmacy Name</label>
          <input type="text" 
            placeholder="Panadol Extra" 
            required
            autoFocus={true}
            // onChange={e=>setMedicineName(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Pharmacy Email</label>
          <input 
            type="text" 
            placeholder="gsk" 
            // onChange={e=>setGeneric(e.target.value)}
            required
          />
          </div>
        <div className="addProductItem">
          <label>Pharmacy Phone No</label>
          <input 
            type="text" 
            placeholder="200ml" 
            // onChange={e=>setmg_ml(e.target.value)}
            required
            />
          </div> */}
        <div className="addProductItem">
          <label>Message</label>
          <textarea
            type="text" 
            placeholder="Hi Admin, I want to say you that..." 
            onChange={e=>setMessage(e.target.value)}
            rows={10}
            required
          ></textarea>
        </div>
        <button type='submit' className="addProductButton" style={{width: 250}} >Submit</button>
      </form>
    </div>
    </div>
  )
}
