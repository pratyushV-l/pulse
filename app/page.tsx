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

    ctx.strokeStyle = "#00FF66";
    ctx.lineWidth = 10;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00FF66";

    let x = 0;
    const drawECG = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(x, canvas.height /2);

      for (let i = 0; i < x; i++) {
        const y = canvas.height / 2 + Math.sin(i * 0.02) * 100;
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
      <div style={{ position: "relative", zIndex: 1}}>
        <h1>Hello</h1>
      </div>
    </div>
  );
}
