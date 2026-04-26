import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Usuario {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
}

function Favoritos() {
  const [favorites, setFavorites] = useState<Usuario[]>([]);

  // 🔁 cargar favoritos desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favs") || "[]");
    setFavorites(stored);
  }, []);

  return (
    <div>
      <h1>Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes usuarios favoritos</p>
      ) : (
        <ul>
          {favorites.map((user) => (
            <li key={user.id}>
              <Link to={`/usuario/${user.id}`}>
                {user.firstname} {user.lastname}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;
