import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import './App.css';
import Login from './Login/Login';
import Home from './Home';
import Vendors from './CompEVendors/Vendors';
import Segments from './CompFSegments/Segments';
import Search from './CompGSearch/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation(); // Get the current location

  return (
    <AnimatePresence mode="wait"> {/* Wrap Routes with AnimatePresence */}
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/vendor" element={<Vendors/>}/>
        <Route path='/segments' element={<Segments/>}/>
        <Route path='/search' element={<Search/>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;