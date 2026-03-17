import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "../shared/CustomCursor";
import PageTransition from "./PageTransition";

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
