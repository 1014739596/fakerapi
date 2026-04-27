import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import "./style.css";

interface Usuario {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  ip: string;
}

type FiltroTipo = 'todos' | 'ip';

function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<FiltroTipo>('todos');

  const filtros: FiltroTipo[] = ['todos', 'ip'];

  // 🚀 CARGA OPTIMIZADA
  useEffect(() => {
    const stored = localStorage.getItem("usuarios");

    if (stored) {
      setUsuarios(JSON.parse(stored));
    } else {
      const fetchData = async () => {
        try {
          const res = await fetch(`https://fakerapi.it/api/v2/users?_quantity=20`);
          const data: any = await res.json();

          setUsuarios(data.data);
          localStorage.setItem("usuarios", JSON.stringify(data.data));

        } catch (error) {
          console.error('Error cargando usuarios:', error);
        }
      };

      fetchData();
    }
  }, []);

  // 🔍 FUNCIÓN DE COINCIDENCIA
  const coincideBusqueda = (user: Usuario) => {
    if (busqueda.length < 3) return false;

    return (
      user.ip.includes(busqueda) ||
      user.firstname.toLowerCase().includes(busqueda.toLowerCase()) ||
      user.lastname.toLowerCase().includes(busqueda.toLowerCase()) ||
      user.email.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  // 🔥 ORDEN SOLO POR RELEVANCIA (NO IP)
  const usuariosFinal = [...usuarios].sort((a, b) => {
    if (coincideBusqueda(a) && !coincideBusqueda(b)) return -1;
    if (!coincideBusqueda(a) && coincideBusqueda(b)) return 1;
    return 0;
  });

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
        <h2>Usuarios</h2>

        <table className="tabla-posiciones">
          <thead>
            <tr>
              <th>#</th>

              {/* 🔄 CAMBIO DE ORDEN SEGÚN FILTRO */}
              {filtro === 'todos' ? (
                <>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>IP</th>
                </>
              ) : (
                <>
                  <th>IP</th>
                  <th>Nombre</th>
                  <th>Email</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {usuariosFinal.map((user, index) => {

              const coincide = coincideBusqueda(user);

              return (
                <tr
                  key={user.id}
                  className={coincide ? 'resaltado' : ''}
                >
                  <td>{index + 1}</td>

                  {/* 🔄 ORDEN DINÁMICO */}
                  {filtro === 'todos' ? (
                    <>
                      <td>
                        <Link to={`/usuario/${user.id}`}>
                          {user.firstname} {user.lastname}
                        </Link>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.ip}</td>
                    </>
                  ) : (
                    <>
                      <td><strong>{user.ip}</strong></td>
                      <td>
                        <Link to={`/usuario/${user.id}`}>
                          {user.firstname} {user.lastname}
                        </Link>
                      </td>
                      <td>{user.email}</td>
                    </>
                  )}

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </>
  );
}

export default Home;
