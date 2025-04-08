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
                <h1>Welcome, Matteo!</h1>
                <div className="section">
                    <h2>Notifications</h2>
                    <ul>
                        <li className="notification">9:40AM A new district(Salem) has been added</li>
                        <li className="notification">6:38AM All Boston Public Schools are closed from 4/20-4/22</li>
                        <li className="notification">6:30AM Driver Lisence Expiring? Renew at massbus.gov </li>
                    </ul>
                </div>
                
                <div className="section">
                    <h2>Available Jobs</h2>
                    <Jobs onApply={handleJobApply} appliedJobs={appliedJobs} />
                </div>
                <div className="section">
                    <h2>My Schedule</h2>
                    <ScheduleGrid schedule={schedule} />
                </div>
                <div className="section earnings-summary">
                    <h2>Earnings Summary</h2>
                    <div className="earnings-grid">
                        <div className="earnings-card">
                            <h3>This Week</h3>
                            <div className="amount">$875.50</div>
                            <div className="stats">
                                <span>Hours: 22.5</span>
                                <span>Jobs: 8</span>
                            </div>
                        </div>
                        <div className="earnings-card">
                            <h3>This Month</h3>
                            <div className="amount">$3,245.75</div>
                            <div className="stats">
                                <span>Hours: 82</span>
                                <span>Jobs: 31</span>
                            </div>
                        </div>
                        <div className="earnings-card">
                            <h3>Year to Date</h3>
                            <div className="amount">$12,850.25</div>
                            <div className="stats">
                                <span>Hours: 320</span>
                                <span>Jobs: 124</span>
                            </div>
                        </div>
                    </div>
                    <div className="earnings-details">
                        <div className="detail-item">
                            <span>Average Per Job:</span>
                            <span>$104.50</span>
                        </div>
                        <div className="detail-item">
                            <span>Average Hourly Rate:</span>
                            <span>$38.75</span>
                        </div>
                        <div className="detail-item">
                            <span>Next Payment Due:</span>
                            <span>April 15, 2025</span>
                        </div>
                    </div>
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

    .earnings-summary {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .earnings-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin: 20px 0;
    }

    .earnings-card {
        background: #f8f9fa;
        padding: 16px;
        border-radius: 8px;
        text-align: center;
        transition: transform 0.2s;
    }

    .earnings-card:hover {
        transform: translateY(-2px);
    }

    .earnings-card h3 {
        color: #6c757d;
        font-size: 0.9rem;
        margin-bottom: 8px;
    }

    .amount {
        font-size: 1.8rem;
        font-weight: bold;
        color: #28a745;
        margin: 8px 0;
    }

    .stats {
        display: flex;
        justify-content: space-around;
        color: #6c757d;
        font-size: 0.9rem;
    }

    .earnings-details {
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid #e9ecef;
    }

    .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        color: #495057;
    }

    .detail-item span:last-child {
        font-weight: 500;
    }

    .notification {
        color: red;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);