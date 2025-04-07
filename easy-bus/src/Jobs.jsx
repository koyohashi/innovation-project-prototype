import React, { useState, useEffect } from 'react';
import jobsData from './docs/available-jobs.txt';

export default function Jobs({ onApply, appliedJobs }) {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetch('/src/docs/available-jobs.txt')
            .then(response => response.text())
            .then(text => {
                const jobBlocks = text.split('\n\n');
                const parsedJobs = jobBlocks.map(block => {
                    const lines = block.split('\n');
                    return {
                        school: lines[0],
                        location: lines[1],
                        date: lines[2],
                        time: lines[3],
                        description: lines[4],
                        pay: lines[5],
                        image: `/src/assets/${lines[6]}`
                    };
                });
                const availableJobs = parsedJobs.filter(job => 
                    !appliedJobs.some(applied => applied.school === job.school)
                );
                setJobs(availableJobs);
            })
            .catch(error => console.error('Error loading jobs:', error));
    }, [appliedJobs]);

    const handleApply = (job) => {
        setSelectedJob(job);
    };

    const handleConfirmApply = () => {
        if (selectedJob) {
            onApply({
                ...selectedJob,
                selectedDate: selectedJob.date
            });
            setSelectedJob(null);
        }
    };

    return (
        <div className="jobs-container">
            {selectedJob ? (
                <div className="job-modal-overlay">
                    <div className="job-modal">
                        <div className="job-modal-image" style={{ backgroundImage: `url(${selectedJob.image})` }} />
                        <div className="job-modal-content">
                            <h2 className="job-modal-title">{selectedJob.school}</h2>
                            <div className="job-modal-details">
                                <p className="job-modal-location">📍 {selectedJob.location}</p>
                                <p className="job-modal-date">📅 {selectedJob.date}</p>
                                <p className="job-modal-time">⏰ {selectedJob.time}</p>
                                <p className="job-modal-description">{selectedJob.description}</p>
                                <p className="job-modal-pay">{selectedJob.pay}</p>
                            </div>

                            <div className="modal-buttons">
                                <button 
                                    onClick={() => setSelectedJob(null)}
                                    className="modal-button close-button"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleConfirmApply}
                                    className="modal-button apply-button"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="jobs-grid">
                    {jobs.map((job, index) => (
                        <div 
                            key={index} 
                            onClick={() => handleApply(job)}
                            className="job-card"
                        >
                            <div className="job-card-image" style={{ backgroundImage: `url(${job.image})` }} />
                            <div className="job-card-content">
                                <h2 className="job-card-title">{job.school}</h2>
                                <div className="job-card-details">
                                    <p className="job-card-location">📍 {job.location}</p>
                                    <p className="job-card-date">📅 {job.date}</p>
                                    <p className="job-card-time">⏰ {job.time}</p>
                                    <p className="job-card-pay">{job.pay}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Add these styles to your CSS file or style section
const styles = `
    .jobs-container {
        padding: 1rem;
        background-color: white;
        display: flex;
        flex-direction: column;
    }

    .jobs-grid {
        display: flex;
        overflow-x: auto;
        gap: 2rem;
        padding: 1rem;
        scrollbar-width: thin;
        scrollbar-color: #3498db #f1f1f1;
    }

    .jobs-grid::-webkit-scrollbar {
        height: 8px;
    }

    .jobs-grid::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    .jobs-grid::-webkit-scrollbar-thumb {
        background: #3498db;
        border-radius: 4px;
    }

    .jobs-grid::-webkit-scrollbar-thumb:hover {
        background: #2980b9;
    }

    .job-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
        min-width: 300px;
        flex: 0 0 auto;
    }

    .job-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .job-card-image {
        height: 200px;
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .job-card-image::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    }

    .job-card-content {
        padding: 1.5rem;
    }

    .job-card-title {
        margin: 0 0 1rem 0;
        color: #2c3e50;
        font-size: 1.25rem;
        font-weight: 600;
    }

    .job-card-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .job-card-location, .job-card-date, .job-card-time {
        color: #666;
        margin: 0;
        font-size: 0.9rem;
    }

    .job-card-pay {
        color: #27ae60;
        font-weight: bold;
        margin: 0.5rem 0 0 0;
    }

    .job-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }

    .job-modal {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 800px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
    }

    .job-modal-image {
        height: 300px;
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .job-modal-image::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    }

    .job-modal-content {
        padding: 2rem;
        overflow-y: auto;
    }

    .job-modal-title {
        margin: 0 0 1rem 0;
        color: #2c3e50;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .job-modal-details {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 2rem;
    }

    .job-modal-location, .job-modal-time {
        color: #666;
        margin: 0;
    }

    .job-modal-description {
        color: #2c3e50;
        margin: 1rem 0;
        line-height: 1.5;
    }

    .job-modal-pay {
        color: #27ae60;
        font-weight: bold;
        margin: 0;
    }

    .date-selector {
        margin: 2rem 0;
    }

    .date-selector-label {
        display: block;
        margin-bottom: 0.5rem;
        color: #2c3e50;
        font-weight: 500;
    }

    .date-selector-dropdown {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        color: #2c3e50;
        background-color: white;
        transition: border-color 0.3s ease;
    }

    .date-selector-dropdown:focus {
        outline: none;
        border-color: #3498db;
    }

    .modal-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    .modal-button {
        flex: 1;
        padding: 0.75rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .close-button {
        background-color: #e74c3c;
        color: white;
    }

    .close-button:hover {
        background-color: #c0392b;
    }

    .apply-button {
        background-color: #27ae60;
        color: white;
    }

    .apply-button:hover {
        background-color: #219a52;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 