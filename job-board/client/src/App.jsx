import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/employer" element={<EmployerDashboard />} />
              <Route path="/candidate" element={<CandidateDashboard />} />
            </Routes>
          </div>
          <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '20px 0', textAlign: 'center', color: 'var(--text-light)' }}>
            <div className="container">
              &copy; {new Date().getFullYear()} JobFindr. All rights reserved.
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
