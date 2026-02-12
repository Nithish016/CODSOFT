import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuizListing from './pages/QuizListing';
import QuizCreation from './pages/QuizCreation';
import QuizTaking from './pages/QuizTaking';
import QuizResults from './pages/QuizResults';
import Auth from './pages/Auth';
import './index.css';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="min-h-screen gradient-bg">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quizzes" element={<QuizListing />} />
              <Route path="/create" element={<QuizCreation />} />
              <Route path="/take/:quizId" element={<QuizTaking />} />
              <Route path="/results" element={<QuizResults />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
