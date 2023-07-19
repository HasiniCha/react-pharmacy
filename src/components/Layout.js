import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_PATH } from "../services/Config";

const Layout = () => {
  const [connectionStatus, setConnectionStatus] = useState(false);

  useEffect(() => {
    // Function to fetch the connection status from the NodeMCU
    const fetchConnectionStatus = async () => {
      try {
        const response = await axios.get(SERVER_PATH+'status');
        console.log(response.data);
        if(response.data == "1") {
          document.getElementById("indi").style.background = "green";
          setConnectionStatus(true);
        }  
      } catch (error) {
        document.getElementById("indi").style.background = "red";
        setConnectionStatus(false);
        console.error('Error fetching connection status:', error);
      }
    };

     // Fetch the connection status on component mount
     fetchConnectionStatus();

     // Periodically fetch the connection status
     const interval = setInterval(fetchConnectionStatus, 10000);
 
     // Clean up the interval on component unmount
     return () => clearInterval(interval);
   }, []);

  return (
    <>
        <div className="header">
            <h2>pharmacy storage assistant</h2>
            <div className="con-status">
              <div className="con-indi" id="indi"></div>
              <div className="con-txt">{connectionStatus?"connected":"not connected"}</div>
            </div>
        </div>
        <Outlet />
    </>
  )
};

export default Layout;
