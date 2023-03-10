import "./newProduct.css";
import React, {useState, useEffect, useContext} from "react";
import { Publish } from "@material-ui/icons";
import { Context } from "../../context/Context";
import { publicRequest } from "../../requestMethod";


export default function NewProduct() {
  const [file, setFile] = useState(null);
  const [medicineName, setMedicineName] = useState("");
  const [generic, setGeneric] = useState("");
  const [mg_ml, setmg_ml] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const {user} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMedicine = {
      pharmacyName: user.pharmacyName,
      pharmacyLocation: user.pharmacyLocation,
      area: user.area,
      timing: user.timing,
      medicineName,
      generic,
      mg_ml,
      quantity,
      price,
    };
    if(file) {
      const data = new FormData();
      const fileName = new Date().getTime() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      newMedicine.img = fileName;
      try {
        const add = publicRequest.post('/upload',data);
        console.log(add);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await publicRequest.post("/medicine/create",newMedicine);
      window.location.replace(`/product/${res.data._id}`);
    } catch (err) {
      alert(err.response.data.message);
    }
  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Medicine</h1>
      <form className="addProductForm" onSubmit={handleSubmit} >
        <div className="productUpload">
        {file && (
        <img src={URL.createObjectURL(file)} alt="" className='writeImg' />
      )}
          <label htmlFor="file">
            <Publish />
          </label>
          <input 
            type="file" 
            id="file" 
            name="image" 
            style={{ display: "none" }} 
            onChange={(e)=>setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Medicine Name</label>
          <input type="text" 
            placeholder="Panadol Extra" 
            required
            autoFocus={true}
            onChange={e=>setMedicineName(e.target.value)}
            pattern={"^[A-Za-z0-9 ]{4,20}$"}
          />
          {<span className="fv">Medicine Name Should Be Min 4 & Max 20 Characters</span>}
        </div>
        <div className="addProductItem">
          <label>Brand Name</label>
          <input 
            type="text" 
            placeholder="gsk" 
            onChange={e=>setGeneric(e.target.value)}
            required
            pattern={"^[A-Za-z0-9 ]{4,30}$"}
          />
            {<span className="fv">Brand Name Should Be Min 4 & Max 30 Character</span>}
        </div>
        <div className="addProductItem">
          <label>Mg_Ml</label>
          <input 
            type="text" 
            placeholder="200ml" 
            onChange={e=>setmg_ml(e.target.value)}
            required
            pattern={"^[A-Za-z0-9 ]{3,7}$"}
          />
            {<span className="fv">eg. 200 mg</span>}
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
            type="text" 
            placeholder="20 Tablets" 
            onChange={e=>setQuantity(e.target.value)}
            required
            pattern={"^[A-Za-z0-9 ]{4,12}$"}
          />
            {<span className="fv">eg. 100 Tablets</span>}
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input 
            type="number" 
            placeholder="20" 
            onChange={e=>setPrice(e.target.value)}
            required
            pattern={"^[0-9]{2,5}$"}
          />
            {<span className="fv">eg. 1000</span>}
        </div>
        {/* <div className="addProductItem">
          <label>In Stock</label>
          <select name="active" id="active" required>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div> */}
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
