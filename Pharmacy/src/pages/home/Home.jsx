import React,{ useState, useEffect, useMemo, useContext } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { publicRequest } from '../../requestMethod';
import { Context } from "../../context/Context";


export default function Home() {
  const [medicineStats, setMedicineStats] = useState([]);
  const {user} = useContext(Context);

  const MONTHS = useMemo(
    ()=>[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(()=>{
    const getStats = async () => {
      try {
        const res = await publicRequest.get(`medicine/medicine-stats?pn=${user.pharmacyName}`);
        // console.log(res.data);
        const list = res.data.sort((a,b)=>{
          return a._id - b._id
        });
        list.map((item)=>
          setMedicineStats((prev)=>[
            ...prev,
            { name: MONTHS[item._id - 1],"Medicines": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  },[MONTHS]);


  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={medicineStats} title="Medicines Analytics" grid dataKey="Medicines"/>
      <div className="homeWidgets">
        {/* <WidgetSm/> */}
        <WidgetLg/>
      </div>
    </div>
  );
}
