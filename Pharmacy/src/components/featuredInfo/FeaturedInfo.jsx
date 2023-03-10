import React,{ useState, useEffect, useContext } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { publicRequest } from "../../requestMethod";
import { Context } from '../../context/Context';

export default function FeaturedInfo() {
  const [count, setCount] = useState(0);
  const [cost, setCost] = useState("Not Cost");
  const [wTime, setWTime] = useState("");

  const {user} = useContext(Context)

  useEffect(() => {
    const totalMedicines = async() => {
      const res = await publicRequest.get(`/medicine/total-medicines?count=${user.pharmacyName}`)
      // console.log(res);
      setCount(res.data);
    }
    const totalCost = async() => {
      try {
        const res = await publicRequest.get(`/medicine/medicine-cost?count=${user.pharmacyName}`)
      setCost(res.data[0].Amount);
      } catch (error) {
        console.log(error);
      }
    }
    totalMedicines();
    totalCost();
  }, []);

  const totalTime = async() => {
    const res = await publicRequest.get('/medicine/wel-time');
    setWTime(res.data);
  }
  totalTime();
  


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{wTime}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" style={{fontSize:"20px"}} >{user.pharmacyName}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Available Medicines</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{count}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Medicine Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. {cost}</span>
        </div>
      </div>
    </div>
  );
}
