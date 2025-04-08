import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ name }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">EasyBus</div>
            <div className="navbar-right">
                <div className="user-menu">
                    <button 
                        className="user-button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        Matteo Buoncristiano
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item">Profile</button>
                            <button className="dropdown-item">Settings</button>
                            <button type="button" className="dropdown-item" onClick={handleLogout} >Logout</button>
                        </div>
                    )}
                </div>
                <button className="navbar-button">Help</button>
            </div>
        </nav>
    );
}

const styles = `
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .navbar-brand {
        font-size: 1.5rem;
        font-weight: bold;
        color: #4a148c;
    }

    .navbar-right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .user-menu {
        position: relative;
    }

    .user-button {
        background: none;
        border: none;
        font-size: 1rem;
        font-weight: 500;
        color: #4a148c;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: background-color 0.2s;
    }

    .user-button:hover {
        background-color: rgba(74, 20, 140, 0.1);
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        min-width: 200px;
        margin-top: 0.5rem;
        overflow: hidden;
    }

    .dropdown-item {
        display: block;
        width: 100%;
        padding: 0.75rem 1rem;
        text-align: left;
        background: none;
        border: none;
        color: #2c3e50;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .dropdown-item:hover {
        background-color: #f8f9fa;
    }

    .navbar-button {
        background: none;
        border: none;
        font-size: 1rem;
        color: #4a148c;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: background-color 0.2s;
    }

    .navbar-button:hover {
        background-color: rgba(74, 20, 140, 0.1);
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 