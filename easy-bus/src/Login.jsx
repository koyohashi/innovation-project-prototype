import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setName }) {
    const [name, setNameLocal] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            setName(name);
            navigate('/home');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-container">
                    <h1 className="login-title">EasyBus</h1>
                    <p className="login-subtitle">School Transportation Management</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Username </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setNameLocal(e.target.value)}
                            className="form-input"
                            placeholder="First and Last Name"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        <span className="button-text">Login</span>
                        <span className="button-arrow">→</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = `
    .login-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #4a148c;
        padding: 2rem;
    }

    .login-box {
        background: white;
        padding: 4rem;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 480px;
        text-align: center;
    }

    .logo-container {
        margin-bottom: 3rem;
    }

    .login-title {
        color: #4a148c;
        font-size: 3rem;
        margin: 0;
        font-weight: 800;
        letter-spacing: -1px;
        background: linear-gradient(135deg, #4a148c 0%, #6a11cb 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .login-subtitle {
        color: #666;
        font-size: 1.1rem;
        margin: 0.5rem 0 0;
        font-weight: 400;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        text-align: left;
    }

    .form-label {
        color: #2c3e50;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.5px;
    }

    .form-input {
        padding: 1.25rem;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        background-color: #f8f9fa;
    }

    .form-input:focus {
        outline: none;
        border-color: #4a148c;
        box-shadow: 0 0 0 4px rgba(74, 20, 140, 0.1);
        background-color: white;
    }

    .form-input::placeholder {
        color: #999;
    }

    .login-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: #4a148c;
        color: white;
        padding: 1.25rem;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 1rem;
    }

    .button-text {
        letter-spacing: 0.5px;
    }

    .button-arrow {
        font-size: 1.2rem;
        transition: transform 0.3s ease;
    }

    .login-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(74, 20, 140, 0.3);
        background-color: #3a0d6c;
    }

    .login-button:hover .button-arrow {
        transform: translateX(4px);
    }

    .login-button:active {
        transform: translateY(0);
    }

    @media (max-width: 480px) {
        .login-box {
            padding: 2.5rem;
            margin: 1rem;
        }

        .login-title {
            font-size: 2.5rem;
        }

        .form-input {
            padding: 1rem;
        }

        .login-button {
            padding: 1rem;
        }
    }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);