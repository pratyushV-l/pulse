"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = "#E1E1E1";
    ctx.lineWidth = 15;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#E1E1E1";

    let x = 0;
    const drawECG = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(x, canvas.height / 7);

      for (let i = 0; i < x; i++) {
        const y = canvas.height / 7 + Math.sin(i * 0.0075) * 30 + Math.sin(i * 0.02) * 20 + Math.sin(i * 0.02) * 5;
        ctx.lineTo(i, y);
      }

      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width - x, canvas.height - canvas.height / 7);

      for (let i = canvas.width; i > canvas.width - x; i--) {
        const y = canvas.height - canvas.height / 7 + Math.sin(i * 0.01) * 30 + Math.sin(i * 0.02) * 25 + Math.sin(i * 0.035) * 5;
        ctx.lineTo(i, y);
      }

      ctx.stroke();

      x += 6;
      if (x < canvas.width) {
        requestAnimationFrame(drawECG);
      }
    };

    drawECG();
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh"}}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%"}}>
        <h1 className="title" style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)"}}>pulse.</h1>
      </div>
    </div>
  );
}
