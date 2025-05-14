import React from "react";
import Header from "../shared components/Header";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
