import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
        <div className="header">
            <h2>pharmacy storage assiatant</h2>
        </div>
        <Outlet />
    </>
  )
};

export default Layout;
