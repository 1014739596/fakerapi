import "./style.css";

function Usuario() {
  return (
    <div className="user-container">
      <h1>Información del Desarrollador</h1>

      <div className="card-user">
        <p><strong>Nombre:</strong> Juan Sebastian Rojas</p>
        <p><strong>Materia:</strong> Desarrollo Web</p>
        <p><strong>Proyecto:</strong> Aplicación React con API</p>
        <p><strong>API utilizada:</strong> FakerAPI</p>

        <p className="descripcion">
          Esta aplicación permite visualizar usuarios generados dinámicamente,
          aplicar filtros, realizar búsquedas y guardar favoritos.
        </p>
      </div>
    </div>
  );
}

export default Usuario;
