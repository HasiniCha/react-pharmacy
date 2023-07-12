import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
        <div className="header">
            <h2>pharmacy storage assistant</h2>
            <div className="con-status">
              <div className="con-indi"></div>
              <div className="con-txt">not connected</div>
            </div>
        </div>
        <Outlet />
    </>
  )
};

export default Layout;
