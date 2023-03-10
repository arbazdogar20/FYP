import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToApp } from "@material-ui/icons";
import { useContext } from "react";
import { Context } from "../../context/Context";
import {Pic} from '../../requestMethod';
import { Link } from "react-router-dom";

export default function Topbar() {
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({type:"LOGOUT"});
    window.location.replace('/');
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Health Collective</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <ExitToApp onClick={handleLogout} />
          </div>
          <div className="topbarIconContainer">
            <Link to='/setting' className="link" >
              <Settings />
            </Link>
          </div>
          <img src={Pic + user.image} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
