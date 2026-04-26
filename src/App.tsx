import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Informativa from './informativa';
import Original from './original';
import Usuario from './usuario';
import Home from './home';
import Favoritos from './favoritos';

import './App.css';

function App() {
  return (
    <>

        <Router>

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/original" element={<Original />} />
              <Route path="/informativa" element={<Informativa />} />
              <Route path="/usuario" element={<Usuario />} />
            </Routes>
          </div>

          <nav className="c-menu">
            <Link to="/">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDy9mBtyJWUPLRobv__N2OwHYdiKAWarKroQ&s" />
              <p>Home</p>
            </Link>

            <Link to="/favoritos">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwirKiGL1VFlx1A456XT5nxNyWds8y4-K5zg&s" />
              <p>Favoritos</p>
            </Link>

            <Link to="/original">
              <img src="https://media.istockphoto.com/id/1448912272/vector/soccer-ball-icon-football-game-ball-icons.jpg?s=170667a&w=0&k=20&c=BppyhfxxHRxTSk_1urxYxFTh9a-UprsyYm5vI0XC7Lg=" />
              <p>Original</p>
            </Link>

            <Link to="/informativa">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/more-info-icon.png" />
              <p>Informativa</p>
            </Link>

            <Link to="/usuario">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzXYh-X4wxX1jfbPywa8HWoNGDnx1Tlo0-g&s" />
              <p>Usuario</p>
            </Link>
          </nav>

        </Router>

    </>
  );
}

export default App;
