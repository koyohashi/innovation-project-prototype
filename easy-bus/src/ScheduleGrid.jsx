import React from 'react';

export default function ScheduleGrid({ schedule }) {
    // Get current week's dates starting from Monday (4/7 to 4/13)
    const getWeekDates = () => {
        const weekDates = [];
        const startDate = new Date('2025-04-08'); // Monday 4/8/25
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            weekDates.push(date);
        }
        return weekDates;
    };

    // Generate time slots from 6:00 to 18:00
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 6; hour <= 20; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return slots;
    };

    const weekDates = getWeekDates();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = generateTimeSlots();

    // Helper function to format date as MM/DD/YY
    const formatDate = (date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear().toString().slice(-2);
        return `${month}/${day}/${year}`;
    };

    return (
        <div className="schedule-container">
            <div className="schedule-grid">
                {/* Time column */}
                <div className="time-column">
                    <div className="time-header"></div>
                    {timeSlots.map((time, index) => (
                        <div key={time} className="time-slot">
                            {time}
                        </div>
                    ))}
                </div>

                {/* Day columns */}
                {weekDates.map((date, index) => (
                    <div key={index} className="day-column">
                        <div className="day-header">
                            <h3>{days[index]}</h3>
                            <p>
                                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                        {timeSlots.map((time, timeIndex) => {
                            const formattedDate = formatDate(date);
                            const job = schedule.find(item => {
                                return item.date === formattedDate &&
                                       item.time.split('-')[0] <= time &&
                                       item.time.split('-')[1] >= time;
                            });

                            return (
                                <div key={timeIndex} className={`time-slot ${job ? 'has-job' : ''}`}>
                                    {job && time === job.time.split('-')[0] && (
                                        <div className="job-info">
                                            <div className="job-school">{job.school}</div>
                                            <div className="job-time">{job.time}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = `
    .schedule-container {
        overflow: hidden;
        border-radius: 8px;
        background-color: #ddd;
    }

    .schedule-grid {
        display: grid;
        grid-template-columns: 100px repeat(7, 1fr);
        gap: 1px;
        background-color: #ddd;
        position: relative;
    }

    .time-column {
        background-color: #f8f9fa;
        position: sticky;
        left: 0;
        z-index: 2;
        display: grid;
        grid-template-rows: 60px repeat(13, 60px);
    }

    .time-header {
        height: 60px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #ddd;
    }

    .time-slot {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
    }

    .day-column {
        background-color: #f8f9fa;
        display: grid;
        grid-template-rows: 60px repeat(13, 60px);
    }

    .day-header {
        height: 60px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        padding: 8px;
        background-color: #f8f9fa;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .day-header h3 {
        margin: 0;
        color: #2c3e50;
        font-size: 1rem;
    }

    .day-header p {
        margin: 4px 0 0 0;
        color: #666;
        font-size: 0.9em;
    }

    .has-job {
        background-color: #e3f2fd;
        position: relative;
    }

    .job-info {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 5px;
        font-size: 0.9em;
    }

    .job-school {
        font-weight: bold;
        color: #2c3e50;
    }

    .job-time {
        color: #666;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 