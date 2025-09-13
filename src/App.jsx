import './App.css';

import TurtleAnimation from "./components/deprecated//TurtleAnimation.jsx"
import Hero from "./components/deprecated//Hero.jsx"
import Navbar from "./components/Navbar.jsx"
import Loader from './components/deprecated//Loader.jsx';
import Carousel from './components/deprecated//Carousel.jsx';
import Footer from './components/deprecated//Footer.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Dashboard />

      {/* <Hero /> */}
      {/* <Carousel />*/}
      {/* <Loader /> */}
      {/* <TurtleAnimation /> */}
      <Footer />
    </>
  );
}
