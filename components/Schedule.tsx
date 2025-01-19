import React, { useEffect, useState, useRef } from "react";
import Tabs from "./Tabs";

const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour <= 24; hour++) {
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? "am" : "pm";
        const time = `${hour12.toString().padStart(2, "0")}:00`;
        slots.push({ time, period });
    }
    return slots;
};

const parseTime = (timeString: string) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
        hours = 0;
    }

    return { hours, minutes };

};

const Schedule = ({ mode, selectedDate, tasks, tags, onTaskComplete }: { mode: string, selectedDate: Date, tasks: any[], tags: any[], onTaskComplete: (id: string) => void }) => {
    const timeSlots = generateTimeSlots();
    const [currentTimePosition, setCurrentTimePosition] = useState(0);
    const currentTimeLineRef = useRef<HTMLDivElement>(null);
    const scheduleContainerRef = useRef<HTMLDivElement>(null);

    const scrollToCurrentTime = () => {
        if (currentTimeLineRef.current && scheduleContainerRef.current) {
            const currentTimeLineElement = currentTimeLineRef.current;
            const scheduleContainerElement = scheduleContainerRef.current;
            const containerHeight = scheduleContainerElement.clientHeight;
            const linePosition = currentTimeLineElement.offsetTop;
            const scrollPosition = linePosition - containerHeight / 5;
            scheduleContainerElement.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const updateCurrentTimePosition = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const totalMinutes = hours * 60 + minutes;
            const position = (totalMinutes / (24 * 60)) * 100;
            setCurrentTimePosition(position);
        };

        updateCurrentTimePosition();
        const intervalId = setInterval(updateCurrentTimePosition, 30000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        scrollToCurrentTime();
    }, [currentTimePosition, mode]);

    const containerHeight = mode === "Week" ? "80%" : "82.5%";
    const containerTop = mode === "Week" ? "17.5%" : "15%";

    const tasksDate = (selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })).toString();
    
    const filteredTasks = tasks.filter(task => task.date === tasksDate);

    console.log(filteredTasks)
    console.log(tasksDate)

    return (
        <div className="schedule-wrapper">
            {mode === "Week" && <Tabs selectedDate={selectedDate} />}
            <div className="schedule-container" ref={scheduleContainerRef} style={{ height: containerHeight, top: containerTop }}>
                {timeSlots.map((slot, index) => (
                    <div key={index} className="time-slot">
                        {slot.time}<span className="period">{slot.period}</span>
                    </div>
                ))}
                <div className="current-time-line" ref={currentTimeLineRef} style={{ top: `calc(${currentTimePosition}% * 2.4)` }}></div>
                {mode === "Day" && filteredTasks.map((task, index) => {
                    if (!task["start time"]) {
                        console.error("Task missing start time:", task);
                        return null;
                    }
                    const { hours, minutes } = parseTime(task["start time"]);
                    const duration = parseInt(task["task duration"], 10);
                    const top = (hours * 60 + minutes) / 600 * 100;
                    const height = duration / 610 * 100;
                    const tagColor = tags.find(tag => tag.name === task.tag)?.color || '#000';

                    return (
                        <div
                            key={index}
                            className="task"
                            style={{
                                position: 'absolute',
                                top: `${top}%`,
                                height: `${height}%`,
                                boxSizing: 'border-box',
                                borderColor: tagColor,
                                background: `repeating-linear-gradient(
                                    45deg,
                                    ${tagColor}33,
                                    ${tagColor}33 10px,
                                    transparent 10px,
                                    transparent 20px
                                )`
                            }}
                        >
                            <button onClick={() => onTaskComplete(task.id)} className="complete-task-button">✔</button>
                            {task["task name"]}
                        </div>
                    );
                })}
                {mode === "Week" && (
                    <>
                        <div className="week-divider" style={{ left: '26.26%', height: "250%" }}></div>
                        <div className="week-divider" style={{ left: '44.70%', height: "250%" }}></div>
                        <div className="week-divider" style={{ left: '63.13%', height: "250%", width: "0.5px" }}></div>
                        <div className="week-divider" style={{ left: '81.57%', height: "250%" }}></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Schedule;