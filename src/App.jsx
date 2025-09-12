import './App.css';
import './styles/Navbar.css';
import './styles/Loader.css';
import './styles/Hero.css';

import TurtleAnimation from "./components/TurtleAnimation.jsx"
import Hero from "./components/Hero.jsx"
import Navbar from "./components/Navbar.jsx"
import Loader from './components/Loader.jsx';
import Carousel from './components/Carousel.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Carousel/>
      {/* <Loader /> */}
      {/* <TurtleAnimation /> */}
      </>
  );
}
