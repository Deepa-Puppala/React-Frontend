// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.scss";

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <br />
      <Outlet />
    </div>
  );
};

export default Layout;
