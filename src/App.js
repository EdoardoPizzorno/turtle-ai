import './App.css';
import './styles/Navbar.css';
import './styles/Loader.css';
import './styles/Hero.css';

import TurtleAnimation from "./components/TurtleAnimation"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Loader from './components/Loader';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Loader /> */}
      {/* <TurtleAnimation /> */}
      </>
  );
}

export default App;
