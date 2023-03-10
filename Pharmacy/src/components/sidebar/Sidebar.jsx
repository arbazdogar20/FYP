import "./sidebar.css";
import {
  Home,
  Storefront,
  LocalHospital,
  RateReview
} from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {

  let activeStyle = {
    textDecoration: "underline",
    backgroundColor: "red"
  };


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/" className="link">
            <li className="sidebarListItem active">
              <Home className="sidebarIcon" />
              Home
            </li>
            </NavLink>
            <NavLink to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Medicines
              </li>
            </NavLink>
            <NavLink to="/newProduct" className="link">
              <li className="sidebarListItem">
                <LocalHospital className="sidebarIcon" />
                Add Medicines
              </li>
            </NavLink>
            <NavLink to="/contact" className="link">
              <li className="sidebarListItem">
                <RateReview className="sidebarIcon" />
                Contact Admin
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
