"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  return (
    <div className="background" style={{ position: "relative", width: "100%", height: "100vh"}}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "absolute", width: "100%", height: "10%", zIndex: 1, padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src='/logo.png' width={50} height={50} quality={100} alt="logo"/>
          <span style={{ marginLeft: "10px", fontSize: "1.5rem" }} className="logotext">pulse.</span>
        </div>
        <button style={{ padding: "10px 20px"}} className="start_button">get started</button>
      </div>
      <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1 className="title" style={{transform: "translate(-50%, -50%)", zIndex: 2}}>stop planning, <br/> start doing.</h1>
        <div style={{ zIndex: 2 }} className="startscroll">scroll to get started <br/> ▼</div>
      </div>
    </div>
  );
}
