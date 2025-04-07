import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import { useState } from 'react';
import Home from './Home';

function App() {
  const [name, setName] = useState('');
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login setName={setName} />} />
        <Route path="/home" element={<Home name={name} />} />
      </Routes>
    </div>
  );
}

export default App;
