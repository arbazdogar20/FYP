import "./widgetLg.css";
import React, { useState, useEffect, useContext } from "react";
import { publicRequest, Pic } from "../../requestMethod";
import { Context } from "../../context/Context";


export default function WidgetLg() {
  const [medicine, setMedicine] = useState([]);

  const {user} = useContext(Context);

  useEffect(() => {
    const getMedicine = async () => {
      const res = await publicRequest.get(`/medicine/?pharmacyname=${user.pharmacyName}`);
      setMedicine(res.data);
    }
    getMedicine();
  }, [])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">New Medicines</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Medicine Name</th>
          <th className="widgetLgTh">Brand Name</th>
          <th className="widgetLgTh">Mg_Ml</th>
          <th className="widgetLgTh">Price</th>
        </tr>
        {medicine.map((medicine)=>(
        <tr className="widgetLgTr" key={medicine._id}>
          <td className="widgetLgUser">
            <img
              src={Pic + medicine.img}
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{medicine.medicineName}</span>
          </td>
          <td className="widgetLgDate">{medicine.generic}</td>
          <td className="widgetLgAmount">{medicine.mg_ml}</td>
          <td className="widgetLgAmount">Rs. {medicine.price}</td>
        </tr>
        ))}
      </table>
    </div>
  );
}
