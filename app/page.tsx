"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "@/components/Loading";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 99000);
    };

    const originalPush = router.push;
    router.push = (url, options) => {
      handleRouteChange();
      return Promise.resolve(originalPush(url, options)).finally(handleRouteComplete);
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  useEffect(() => {
    const handleClick = () => {
      router.push("/login-signup");
    };

    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [router]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div className="background" style={{ position: "relative", width: "100%", height: "100vh"}}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "absolute", width: "100%", height: "10%", zIndex: 1, padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src='/logo.png' width={50} height={50} quality={100} alt="logo"/>
            <span style={{ marginLeft: "10px", fontSize: "1.5rem" }} className="logotext">pulse.</span>
          </div>
          <button style={{ padding: "10px 20px"}} className="start_button">get started</button>
        </div>
        <div className="ticker-container">
          <div className="ticker">
            {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
              <span key={index + 20}>{word}</span>
            ))}
          </div>
        </div>
        <div className="ticker-container-2">
          <div className="ticker">
            {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
              <span key={index + 20}>{word}</span>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h1 className="title" style={{transform: "translate(-50%, -50%)", zIndex: 2}}>stop planning, <br/> start doing.</h1>
          <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center',  alignItems: "center"}} className="startscroll">
            <div>click anywhere to get started</div>
            <Image src="/logo.png" width={25} height={25} alt="click" style={{ paddingTop: 10}} className="clicker"/>
          </div>
        </div>
        <p className="watermark">
          An <a href="https://github.com/pratyushV-l/pulse">open source</a> venture by <a href="https://github.com/pratyushv-l">pratyushv-1</a>.
        </p>
      </div>
    </div>
  );
}
