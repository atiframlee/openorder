import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import './App.css';
import Login from './Page/Login/Login';
import Home from './Page/Home/Home';
import Vendors from './components/Vendors';
import Segments from './components/Segments';
import Search from './Page/Search/Search';
import VendorDashBoard from './Page/VendorDashboard/VendorDashBoard';
import Cart from './Page/Cart/Cart';
import NewComponent from './components/NewComponent';
import GlobalUI from './components/GlobalUI';

function App() {


  return (
    <div className="App">
      <Router>
          <AnimatedRoutes />
          <GlobalUI />
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
        <Route path="/vendor" element={<Vendors />} />
        <Route path='/segments' element={<Segments />} />
        <Route path='/search' element={<Search />} />
        <Route path='vendor-dashboard' element={<VendorDashBoard />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/new-component' element={<NewComponent />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;