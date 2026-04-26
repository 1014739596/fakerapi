import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import "./style.css";

interface Usuario {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
}

type FiltroTipo = 'todos' | 'hombres' | 'mujeres';

function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [title, setTitle] = useState('Usuarios');

  const [filtro, setFiltro] = useState<FiltroTipo>('todos');
  const [busqueda, setBusqueda] = useState('');

  const filtros: FiltroTipo[] = ['todos', 'hombres', 'mujeres'];

  useEffect(() => {
    setBusqueda('');

    const fetchData = async () => {
      try {
        const res = await fetch(`https://fakerapi.it/api/v2/users?_quantity=20`);
        const data = await res.json();
        setUsuarios(data.data);
      } catch (error) {
        console.error('Error cargando usuarios:', error);
      }
    };

    fetchData();
  }, [filtro]);

  // 🔍 FILTRO POR GÉNERO
  const usuariosFiltrados = usuarios.filter((user) => {
    if (filtro === 'hombres') return user.gender === 'male';
    if (filtro === 'mujeres') return user.gender === 'female';
    return true;
  });

  // 🔎 BUSCADOR (igual lógica del repo)
  const usuariosBusqueda = usuariosFiltrados.filter((user) =>
    busqueda.length < 3
      ? true
      : user.firstname.toLowerCase().includes(busqueda.toLowerCase()) ||
        user.lastname.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* 🔘 FILTROS */}
      <div className="filtros">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={filtro === f ? 'activo' : ''}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 🔍 BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* 📊 TABLA */}
      <div className="tabla-container">
        <h2>{title}</h2>

        <table className="tabla-posiciones">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Género</th>
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
                    ? 'resaltado'
                    : ''
                }
              >
                <td>{index + 1}</td>

                <td>
                  {/* mantenemos Link para parecerse al repo */}
                  <Link to={`/usuario/${user.id}`}>
                    {user.firstname} {user.lastname}
                  </Link>
                </td>

                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
