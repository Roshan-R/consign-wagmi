import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Issue from './pages/Issue';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Dashboard from './pages/Dashboard';

import { Demo } from './Demo';

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/issue" element={<Issue />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/demo" element={<Demo />} />
            </Routes>
        </Router>
    );

}
