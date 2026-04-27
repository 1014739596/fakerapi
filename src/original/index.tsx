import { useEffect, useState } from "react";

import "./style.css";

interface Usuario {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  ip: string;
  username: string;
  website: string;
}

function Original() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioRandom, setUsuarioRandom] = useState<Usuario | null>(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("usuarios");

    if (stored) {
      const data = JSON.parse(stored);
      setUsuarios(data);
      generarRandom(data);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://fakerapi.it/api/v2/users?_quantity=20`);
      const data = await res.json();

      setUsuarios(data.data);
      localStorage.setItem("usuarios", JSON.stringify(data.data));

      generarRandom(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generarRandom = (lista: Usuario[]) => {
    const random = lista[Math.floor(Math.random() * lista.length)];
    setUsuarioRandom(random);

    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setEsFavorito(favs.includes(random.id));
  };

  const cambiarUsuario = () => {
    if (usuarios.length > 0) {
      generarRandom(usuarios);
    }
  };

  const toggleFavorito = () => {
    if (!usuarioRandom) return;

    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");

    let nuevos;

    if (favs.includes(usuarioRandom.id)) {
      nuevos = favs.filter((id: number) => id !== usuarioRandom.id);
    } else {
      nuevos = [...favs, usuarioRandom.id];
    }

    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    setEsFavorito(!esFavorito);
  };

  if (!usuarioRandom) return <p>Cargando...</p>;

  return (
    <div className="original-container">

      <h1>🎲 Usuario Destacado</h1>

      <div className="card-original">

        <img
          src={`https://i.pravatar.cc/300?img=${usuarioRandom.id}`}
          alt="usuario"
        />

        <h2>{usuarioRandom.firstname} {usuarioRandom.lastname}</h2>

        <p><strong>Email:</strong> {usuarioRandom.email}</p>
        <p><strong>IP:</strong> {usuarioRandom.ip}</p>
        <p><strong>Username:</strong> {usuarioRandom.username}</p>

        <div className="botones">
          <button onClick={cambiarUsuario}>🔄 Otro usuario</button>

          <button
            className={`fav ${esFavorito ? "activo" : ""}`}
            onClick={toggleFavorito}
          >
            {esFavorito ? "❤️" : "🤍"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Original;
