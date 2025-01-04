"use client";

import React, { useState } from "react";
import Calendar from "@/components/Calendar";
import Image from "next/image";

function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const day = selectedDate.getDate();
    const ordinalDay = `${day}${getOrdinalSuffix(day)}`;
    const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const month = selectedDate.toLocaleDateString('en-US', { month: 'short' });
    const year = selectedDate.getFullYear();

    const formattedDate = `${weekday}, ${month} ${ordinalDay}, ${year}`;

    return (
        <div className="background-3">
            <div className="straight-line">
            </div>
            <h1 className="title-3">{formattedDate}</h1>
            <div className="ticker-container-6">
                <div className="ticker">
                    {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
                    <span key={index}>{word}</span>
                    ))}
                    {["Efficiency", "Output", "Performance", "Effectiveness", "Proficiency", "Workrate", "Yield", "Capability", "Throughput", "Competence", "Result", "Accomplishment", "Workload", "Produciveness", "Production", "Capacity", "Achievement", "Return", "Excellence", "Success"].map((word, index) => (
                    <span key={index + 20}>{word}</span>
                    ))}
                </div>
            </div>
            <Calendar onDateChange={setSelectedDate} selectedDate={selectedDate} />
            <div style={{ position: "fixed", display: "flex", alignItems: "center", zIndex: 9998, paddingTop: 7.5, paddingLeft: 90 }}>
                <Image src='/logo.png' width={35} height={35} quality={100} alt="logo"/>
                <span style={{ marginLeft: "10px", fontSize: "1.5rem" }} className="logotext">pulse.</span>
            </div>
            <div className="selection_row">
                <select className="dropdown">
                    <option value="option1">Day</option>
                    <option value="option2">Week</option>
                    <option value="option3">Month</option>
                </select>
                <button className="today_btn" onClick={() => setSelectedDate(new Date())}>Today</button>
            </div>
        </div>
    )
}