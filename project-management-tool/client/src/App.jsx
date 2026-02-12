import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="main-content w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
