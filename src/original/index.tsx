import { useState, useEffect } from "react";
import "./style.css";

interface Usuario {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
}

type FiltroTipo = "todos" | "jovenes" | "adultos" | "mayores";

function Original() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtro, setFiltro] = useState<FiltroTipo>("todos");
  const [busqueda, setBusqueda] = useState("");

  const filtros: FiltroTipo[] = ["todos", "jovenes", "adultos", "mayores"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://fakerapi.it/api/v2/users?_quantity=20"
        );
        const data = await res.json();
        setUsuarios(data.data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };

    fetchData();
  }, []);

  // 🎂 calcular edad
  const calcularEdad = (fecha: string) => {
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    return hoy.getFullYear() - nacimiento.getFullYear();
  };

  // 🔍 filtro por edad
  const usuariosFiltrados = usuarios.filter((user) => {
    const edad = calcularEdad(user.birthday);

    if (filtro === "jovenes") return edad < 25;
    if (filtro === "adultos") return edad >= 25 && edad < 50;
    if (filtro === "mayores") return edad >= 50;

    return true;
  });

  // 🔎 buscador
  const usuariosBusqueda = usuariosFiltrados.filter((user) =>
    busqueda.length < 3
      ? true
      : user.firstname.toLowerCase().includes(busqueda.toLowerCase()) ||
        user.lastname.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* 🔘 filtros */}
      <div className="filtros">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={filtro === f ? "activo" : ""}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 🔍 buscador */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* 📊 tabla */}
      <div className="tabla-container">
        <h2>Usuarios por Edad</h2>

        <table className="tabla-posiciones">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
            </tr>
          </thead>

          <tbody>
            {usuariosBusqueda.map((user, index) => (
              <tr
                key={user.id}
                className={
                  busqueda.length >= 3 &&
                  (user.firstname.toLowerCase().includes(busqueda.toLowerCase()) ||
                    user.lastname.toLowerCase().includes(busqueda.toLowerCase()))
                    ? "resaltado"
                    : ""
                }
              >
                <td>{index + 1}</td>
                <td>
                  {user.firstname} {user.lastname}
                </td>
                <td>{user.email}</td>
                <td>{calcularEdad(user.birthday)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Original;
