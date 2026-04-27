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
              <Route path="/usuario/:id" element={<Usuario />} />
            </Routes>
          </div>

          <nav className="c-menu">
            <Link to="/">
              <img src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png" />
              <p>Home</p>
            </Link>

            <Link to="/favoritos">
              <img src="https://cdn-icons-png.flaticon.com/128/1068/1068731.png" />
              <p>Favoritos</p>
            </Link>

            <Link to="/original">
              <img src="https://cdn-icons-png.flaticon.com/128/14886/14886129.png" />
              <p>Original</p>
            </Link>

            <Link to="/informativa">
              <img src="https://cdn-icons-png.flaticon.com/128/8/8201.png" />
              <p>Informativa</p>
            </Link>

            <Link to="/usuario">
              <img src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png" />
              <p>Usuario</p>
            </Link>
          </nav>

        </Router>

    </>
  );
}

export default App;
