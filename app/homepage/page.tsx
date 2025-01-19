"use client";

import React, { useEffect, useState, useRef } from "react";
import Calendar from "@/components/Calendar";
import Image from "next/image";
import Cookies from "js-cookie";
import TimeLeftWidget from "@/components/TimeLeftWidget";
import Schedule from "@/components/Schedule";

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
    const [showTaskPopup, setShowTaskPopup] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskStartTime, setTaskStartTime] = useState("");
    const [taskDuration, setTaskDuration] = useState("");
    const [selectedTag, setSelectedTag] = useState(tags[0].name);
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    useEffect(() => {
        const savedMode = Cookies.get("mode");
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    useEffect(() => {
        Cookies.set("mode", mode);
    }, [mode]);

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

    const handleAddTask = () => {
        setShowTaskPopup(true);
    }

    const handleSubmitTask = () => {
        setShowTaskPopup(false);
        setNewTaskName("");
        setTaskDate("");
        setTaskStartTime("");
        setTaskDuration("");
        setSelectedTag(tags[0].name);
        setShowMoreOptions(false);
    }

    const handleCloseTaskPopup = () => {
        setShowTaskPopup(false);
        setShowMoreOptions(false);
    }

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
                <button className="new_task_btn-1" onClick={handleAddTask}>
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
            <button className="new_task_btn-2" onClick={handleAddTask}>
                <div className="button_content">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>New Task</span>
                </div>
            </button>
            {showTaskPopup && (
                <>
                    <div className="blur-background"></div>
                    <div className="popup task-popup">
                        <button className="close-button" onClick={handleCloseTaskPopup}>✖</button>
                        <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Enter Your Task" />
                        <button onClick={handleSubmitTask} disabled={!newTaskName.trim()} className="popup-submit-button">Add</button>
                        <button onClick={() => setShowMoreOptions(!showMoreOptions)} className="popup-view-button">
                            {showMoreOptions ? "" : "View more options"}
                        </button>
                        {showMoreOptions && (
                            <>
                                <label className="input-label">
                                    Date:ㅤ
                                    <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
                                </label>
                                <label className="input-label">
                                    Time:ㅤ
                                    <input type="time" value={taskStartTime} onChange={(e) => setTaskStartTime(e.target.value)} />
                                </label>
                                <input type="text" className="duration" value={taskDuration} onChange={(e) => setTaskDuration(e.target.value)} placeholder="Duration" />
                                <label className="input-label">
                                    Tag:ㅤ
                                    <select className="tag-input" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                                        {tags.map((tag, index) => (
                                            <option key={index} value={tag.name}>{tag.name}</option>
                                        ))}
                                    </select>
                                </label>
                            </>
                        )}
                    </div>
                </>
            )}
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
                    <>
                        <div className="blur-background"></div>
                        <div className="popup">
                            <button className="close-button" onClick={() => setShowPopup(false)}>✖</button>
                            <input type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="Tag Name" />
                            <input type="color" value={newTagColor} onChange={(e) => setNewTagColor(e.target.value)} />
                            <button onClick={handleSubmitTag} disabled={!newTagName.trim()} className="popup-submit-button">Submit</button>
                        </div>
                    </>
                )}
            <Schedule mode={mode} selectedDate={selectedDate}/>
            <TimeLeftWidget numTags={tags.length}/>
        </div>
    )
}