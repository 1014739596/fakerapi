import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Usuario {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  ip: string;
}

function Favoritos() {
  const [favoritos, setFavoritos] = useState<Usuario[]>([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const storedFavs = JSON.parse(localStorage.getItem("favoritos") || "[]");

    const filtrados = storedUsers.filter((user: Usuario) =>
      storedFavs.includes(user.id)
    );

    setFavoritos(filtrados);
  }, []);

  return (
    <div className="tabla-container">
      <h2>Usuarios Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>No tienes favoritos aún</p>
      ) : (
        <table className="tabla-posiciones">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>IP</th>
            </tr>
          </thead>

          <tbody>
            {favoritos.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>

                <td>
                  <Link to={`/usuario/${user.id}`}>
                    {user.firstname} {user.lastname}
                  </Link>
                </td>

                <td>{user.email}</td>
                <td>{user.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Favoritos;
