
import React  from 'react'
import AddRecord from './pages/AddRecord/AddRecord'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';

export const App = () => {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-record" element={<AddRecord />} />
      </Routes>
    </Router>
    
    </>
  )
}


export default App