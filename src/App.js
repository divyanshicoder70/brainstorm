import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Dashboard from './component/dashboard';
import Rockets from './component/rockets';


function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/rockets">Rockets</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/rockets" element={<Rockets />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;