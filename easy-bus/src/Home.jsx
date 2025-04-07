import { Navigate } from 'react-router-dom';
import Jobs from './Jobs';
import Navbar from './Navbar';
import ScheduleGrid from './ScheduleGrid';
import { useState } from 'react';

export default function Home({ name }) {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [schedule, setSchedule] = useState([]);

    if (!name) {
        return <Navigate to="/" replace />;
    }

    const handleJobApply = (job) => {
        // Add to applied jobs
        setAppliedJobs([...appliedJobs, job]);
        
        // Add to schedule - date is already in MM/DD/YY format
        setSchedule(prev => [...prev, {
            date: job.selectedDate,
            time: job.time,
            school: job.school
        }]);
    };

    return (
        <div className="home-container">
            <Navbar name={name} />
            <div className="content">
                <h1>Welcome, {name}!</h1>
                <div className="section">
                    <h2>Available Jobs</h2>
                    <Jobs onApply={handleJobApply} appliedJobs={appliedJobs} />
                </div>

                <div className="section">
                    <h2>My Schedule</h2>
                    <ScheduleGrid schedule={schedule} />
                </div>
            </div>
        </div>
    );
}

const styles = `
    .home-container {
        background-color: #f8f9fa;
    }

    .content {
        padding: 2rem;
        margin-top: 1rem;
    }

    .section {
        margin-bottom: 1.5rem;
        background-color: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .section h2 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);