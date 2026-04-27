import { useParams } from "react-router-dom";
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

function Usuario() {
  const { id } = useParams<{ id: string }>();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [esFavorito, setEsFavorito] = useState(false);

  // 🔥 CARGAR USUARIO DESDE LOCALSTORAGE
  useEffect(() => {
    const stored = localStorage.getItem("usuarios");

    if (stored && id) {
      const usuarios: Usuario[] = JSON.parse(stored);

      const encontrado = usuarios.find(
        (u) => u.id === Number(id)
      );

      if (encontrado) {
        setUsuario(encontrado);

        // 🔥 VERIFICAR SI ES FAVORITO
        const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
        setEsFavorito(favs.includes(encontrado.id));
      }
    }
  }, [id]);

  // ❤️ TOGGLE FAVORITOS
  const toggleFavorito = () => {
    if (!usuario) return;

    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");

    let nuevos;

    if (favs.includes(usuario.id)) {
      nuevos = favs.filter((id: number) => id !== usuario.id);
    } else {
      nuevos = [...favs, usuario.id];
    }

    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    setEsFavorito(!esFavorito);
  };

  // ⏳ LOADING
  if (!usuario) return <p className="loading">Cargando usuario...</p>;

  return (
    <div className="usuario-container">
      <div className="card-usuario">

        {/* ❤️ BOTÓN FAVORITO */}
        <button
          className={`btn-fav ${esFavorito ? "activo" : ""}`}
          onClick={toggleFavorito}
        >
          {esFavorito ? "❤️" : "🤍"}
        </button>

        {/* 🖼️ IMAGEN */}
        <img
          src={`https://i.pravatar.cc/300?img=${usuario.id}`}
          alt="usuario"
          className="avatar"
        />

        {/* 👤 NOMBRE */}
        <h1>{usuario.firstname} {usuario.lastname}</h1>

        {/* 📊 INFO */}
        <div className="info">
          <p><span>Email:</span> {usuario.email}</p>
          <p><span>Username:</span> {usuario.username}</p>
          <p><span>IP:</span> {usuario.ip}</p>
          <p><span>Website:</span> {usuario.website}</p>
        </div>

      </div>
    </div>
  );
}

export default Usuario;
