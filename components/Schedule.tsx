import React, { useEffect, useState, useRef } from "react";

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

const Schedule = ({ mode }: { mode: string }) => {
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
    const containerTop = mode === "Week" ? "17%" : "14.5%";

    return (
        <div className="schedule-container" ref={scheduleContainerRef} style={{ height: containerHeight, top: containerTop }}>
            {timeSlots.map((slot, index) => (
                <div key={index} className="time-slot">
                    {slot.time}<span className="period">{slot.period}</span>
                </div>
            ))}
            <div className="current-time-line" ref={currentTimeLineRef} style={{ top: `calc(${currentTimePosition}% * 2.4)` }}></div>
            {mode === "Week" && (
                <>
                    <div className="week-divider" style={{ left: '26.26%', height: "250%" }}></div>
                    <div className="week-divider" style={{ left: '44.70%', height: "250%" }}></div>
                    <div className="week-divider" style={{ left: '63.13%', height: "250%", width: "0.5px" }}></div>
                    <div className="week-divider" style={{ left: '81.57%', height: "250%" }}></div>
                </>
            )}
        </div>
    );
};

export default Schedule;