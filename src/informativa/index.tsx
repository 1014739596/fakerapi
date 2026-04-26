import "./style.css";

function Informativa() {
  return (
    <div className="info-container">
      <h1>Información de la API</h1>

      <p>
        Esta aplicación utiliza la API pública <strong>FakerAPI</strong> para generar datos de usuarios ficticios.
      </p>

      <h2>Endpoint utilizado</h2>
      <p>https://fakerapi.it/api/v2/users</p>

      <h2>¿Qué datos se obtienen?</h2>
      <ul>
        <li>Nombre y apellido</li>
        <li>Correo electrónico</li>
        <li>Teléfono</li>
        <li>Género</li>
        <li>Fecha de nacimiento</li>
      </ul>

      <h2>Uso en la aplicación</h2>
      <p>
        Los datos obtenidos se utilizan para mostrar una lista de usuarios,
        aplicar filtros, realizar búsquedas y guardar favoritos.
      </p>

      <h2>Tecnologías usadas</h2>
      <ul>
        <li>React</li>
        <li>TypeScript</li>
        <li>Vite</li>
      </ul>
    </div>
  );
}

export default Informativa;
