"use client";

import React, { useEffect, useState, useRef } from "react";
import Calendar from "@/components/Calendar";
import Image from "next/image";
import Cookies from "js-cookie";
import TimeLeftWidget from "@/components/TimeLeftWidget";

function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function getRandomBrightColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mode, setMode] = useState("Day");
    const [tags, setTags] = useState([{ name: "Other", color: "#ffd999" }]);
    const [showPopup, setShowPopup] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [newTagColor, setNewTagColor] = useState(getRandomBrightColor());
    const calendarBodyRef = useRef<HTMLDivElement>(null);
    const [currentTimePosition, setCurrentTimePosition] = useState(0);

    useEffect(() => {
        const savedMode = Cookies.get("mode");
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    useEffect(() => {
        Cookies.set("mode", mode);
    }, [mode]);

    useEffect(() => {
        const updateCurrentTimePosition = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const totalMinutes = hours * 60 + minutes;
            const position = (totalMinutes / 720) * 100;
            setCurrentTimePosition(position);
        };

        updateCurrentTimePosition();
        const intervalId = setInterval(updateCurrentTimePosition, 60000);

        if (calendarBodyRef.current) {
            const currentTime = new Date().getHours();
            const scrollPosition = (currentTime - 2) * (calendarBodyRef.current.scrollHeight / 24);
            calendarBodyRef.current.scrollTop = scrollPosition;
        }

        return () => clearInterval(intervalId);
    }, []);

    const handleAddTag = () => {
        if (tags.length < 5) {
            setShowPopup(true);
            setNewTagColor(getRandomBrightColor())
        }
    }

    const handleSubmitTag = () => {
        const otherTagIndex = tags.findIndex(tag => tag.name === "Other");
        const newTags = [...tags];
        newTags.splice(otherTagIndex, 0, { name: newTagName, color: newTagColor });
        setTags(newTags);
        setShowPopup(false);
        setNewTagName("");
        setNewTagColor(getRandomBrightColor());
    };

    const handleDeleteTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    }

    const day = selectedDate.getDate();
    const ordinalDay = `${day}${getOrdinalSuffix(day)}`;
    const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
    const month = selectedDate.toLocaleDateString('en-US', { month: 'short' });
    const year = selectedDate.getFullYear();

    const formattedDate = `${weekday}, ${month} ${ordinalDay}, ${year}`;

    const getTopValue = (numTags: number) => {
        switch (numTags) {
        case 1:
            return "58%";
        case 2:
            return "63%";
        case 3:
            return "68%";
        case 4:
            return "73%";
        case 5:
            return "78%";
        default:
            return "83%";
        }
    };

    const renderTimeSlots = () => {
        const timeSlots = [];
        for (let i = 0; i < 24; i++) {
            const time = `${i < 10 ? '0' : ''}${i}:00`;
            timeSlots.push(
                <div key={i} className="time-slot">
                    <span>{time}</span>
                </div>
            );
        }
        return timeSlots;
    };

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
            <p className="tags-label">Tags:</p>
                <div className="tags-container">
                    {tags.map((tag, index) => (
                        <div key={index} className="tag" style={{ color: tag.color }}>
                            <span className="tag-name">{tag.name}</span>
                            {tag.name !== "Other" && <button type="button" className="delete-tag" onClick={() => handleDeleteTag(index)}>✖</button>}
                        </div>
                    ))}
                </div>
                <button className="add-tag-btn" onClick={handleAddTag} disabled = {tags.length >= 5} style={{ top: getTopValue(tags.length) }}>
                    Add Tag
                </button>
            {showPopup && (
                <div className="popup">
                    <input type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="Tag Name" />
                    <input type="color" value={newTagColor} onChange={(e) => setNewTagColor(e.target.value)} />
                    <button onClick={handleSubmitTag} disabled={!newTagName.trim()}>Submit</button>
                </div>
            )}
            <div className="calendar-container">
                <div className="calendar-body" ref={calendarBodyRef}>
                    {renderTimeSlots()}
                    <div className="current-time-line" style={{ top: `${currentTimePosition}%` }}></div>
                </div>
            </div>
            <TimeLeftWidget numTags={tags.length}/>
        </div>
    )
}