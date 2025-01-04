"use client";

import React, { useEffect, useState } from "react";
import Calendar from "@/components/Calendar";
import Image from "next/image";
import Cookies from "js-cookie";

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
    const [mode, setMode] = useState("Day");

    useEffect(() => {
        const savedMode = Cookies.get("mode");
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    useEffect(() => {
        Cookies.set("mode", mode);
    }, [mode]);

    const day = selectedDate.getDate();
    const ordinalDay = `${day}${getOrdinalSuffix(day)}`;
    const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
    const month = selectedDate.toLocaleDateString('en-US', { month: 'short' });
    const year = selectedDate.getFullYear();

    const formattedDate = `${weekday}, ${month} ${ordinalDay}, ${year}`;

    return (
        <div className="background-3">
            <div className="straight-line">
            </div>
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
            <Calendar onDateChange={setSelectedDate} selectedDate={selectedDate} mode={mode} />
            <div style={{ position: "fixed", display: "flex", alignItems: "center", zIndex: 9998, paddingTop: 7.5, paddingLeft: 90 }}>
                <Image src='/logo.png' width={35} height={35} quality={100} alt="logo"/>
                <span style={{ marginLeft: "10px", fontSize: "1.5rem" }} className="logotext">pulse.</span>
            </div>
            <div className="header-row">
                <h1 className="title-3">{formattedDate}</h1>
                <div className="selection_row">
                    <select className="dropdown" value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value="Day">Day</option>
                        <option value="Week">Week</option>
                    </select>
                    <button className="today_btn" onClick={() => setSelectedDate(new Date())}>Today</button>
                </div>
                <button className="new_task_btn-1">
                    <div className="button_content">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
                            <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>New Task</span>
                    </div>
                </button>
            </div>
            <button className="new_task_btn-2">
                <div className="button_content">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>New Task</span>
                </div>
            </button>
        </div>
    )
}