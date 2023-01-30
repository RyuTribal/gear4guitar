import Navbar from './components/navbar';
import React from 'react';
import Home from './pages/home/home';
import Search from './pages/search/search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search/>} />
      </Routes>
    </Router>
  );
}

export default App;

// Client = npm start
// Server = npm run dev