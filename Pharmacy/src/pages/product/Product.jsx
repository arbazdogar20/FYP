import React,{ useState, useEffect, useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { publicRequest, Pic } from "../../requestMethod";
import { Context } from "../../context/Context";

export default function Product() {
  const location = useLocation();
  const medicineId = location.pathname.split('/')[2];
  const {user} = useContext(Context);
  
  const [medicine, setMedicine] = useState({});
  
    const [price, setPrice] = useState(null);
    const [inStock, setStock] = useState(true);
    const [file, setFile] = useState(null);
    
    useEffect(() => {
      const getMedicine = async () => {
        const res = await publicRequest.get(`/medicine/${medicineId}`);
        setMedicine(res.data);
      }
      getMedicine();
    }, [medicineId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const updateMedicine = {
        pharmacyName: user.pharmacyName,
        price,
        inStock
      }
      if(file){
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name",fileName);
        data.append("file",file);
        updateMedicine.img = fileName;
        try {
            await publicRequest.post('/upload',data);
        } catch (error) {
            console.log(error);
        }
    }
      try {
        await publicRequest.put(`/medicine/${medicineId}`, updateMedicine);
      window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <div className="product">
        {medicine.pharmacyName === user.pharmacyName && (
      <div className="productTitleContainer">
        <h1 className="productTitle">Medicine</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
        )}
      {medicine.pharmacyName === user.pharmacyName && (
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={Pic+medicine.img} alt="" className="productInfoImg" />
                  <span className="productName">{medicine.medicineName}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{medicine._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Generic:</span>
                      <span className="productInfoValue">{medicine.generic}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">mg_ml:</span>
                      <span className="productInfoValue">{medicine.mg_ml}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">price:</span>
                      <span className="productInfoValue">{medicine.price}</span>
                  </div>
              </div>
          </div>
      </div>
      )}
      {medicine.pharmacyName === user.pharmacyName && (
      <div className="productBottom">
          <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                  {/* <label>Medicine Name</label>
                  <input type="text" placeholder={medicine.medicineName} /> */}
                  <label>Price</label>
                  <input 
                    type="number" 
                    placeholder={medicine.price}
                    required
                    onChange={e=>setPrice(e.target.value)}
                  />
                  {/* <label>Quantity</label>
                  <input type="text" placeholder={medicine.quantity} /> */}
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={e=>setStock(e.target.value)}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img 
                        src={file ? URL.createObjectURL(file):Pic+medicine.img} 
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
                  <button className="productButton" type="submit">Update</button>
              </div>
          </form>
      </div>
    )}
    </div>
  );
}
