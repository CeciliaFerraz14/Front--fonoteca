import { useState, useEffect } from "react"; //importo hooks de react para amnejar estados
import "bootstrap/dist/css/bootstrap.min.css"; //importo estilos de Bootstrap
import "./estilos.css"; // importo la hoja de estilos personalizada
import icono from "./archivos/icono.png"; //importo la imagen 
//importo los componentes Discos y Formulario
import Discos from "./Discos"; 
import Formulario from "./Formulario";

//Componente principal
function App() { //defino los estados
  let [discos, setDiscos] = useState([]);
  let [verFavoritos, setVerFavoritos] = useState(false);
  let[cargando,setCargando] = useState (true)

  useEffect(() => {   //conecto con la base de datos
    setCargando(true)
    fetch("https://back-fonoteca.onrender.com/discos")  //petición al endpoint de discos
      .then((respuesta) => respuesta.json())
      .then((discos) => {
        setDiscos(discos);
        setCargando(false)})
    
   }, []);
    

  function agregarDisco(disco, artista, genero) {  //función para agregar un nuevo disco con una petición POST
    fetch("https://back-fonoteca.onrender.com/discos/nueva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //envía los datos en JSON
      },
      body: JSON.stringify({ disco, artista, genero }),
    })
      .then((respuesta) => respuesta.json())
      .then(({ id }) => {
        setDiscos([
          ...discos,
          { id, nombre: disco, artista, genero, favorito: false },
        ]);
        
      })
      .catch((error) => console.error("Error al agregar disco:", error));
      
  }
 


  function borrarDisco(id) { //función para eliminar un disco por su ID con una solicitud DELETE
    fetch(`https://back-fonoteca.onrender.com/discos/borrar/${id}`, {
      method: "DELETE",
    })
      .then((respuesta) => respuesta.json())
      .then(({ resultado }) => {
        if (resultado === "ok") {
          setDiscos(discos.filter((disco) => disco.id !== id));
        }
      })
      .catch((error) => console.error("Error al borrar disco:", error));
  }

  function editarDisco(id, nuevoNombre, nuevoArtista, nuevoGenero) {   //función para editar un disco, con una solicitud PUT
    fetch(`https://back-fonoteca.onrender.com/discos/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        disco: nuevoNombre,
        artista: nuevoArtista,
        genero: nuevoGenero,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then(({ resultado }) => {
        if (resultado == "ok") {
          setDiscos(
            discos.map((disco) =>
              disco.id == id
                ? {
                    ...disco,
                    nombre: nuevoNombre,
                    artista: nuevoArtista,
                    genero: nuevoGenero,
                  }
                : disco
            )
          );
        }
      })
      .catch((error) => console.error("Error al editar disco:", error));

  }

  function actualizarEstado(id, nuevoEstadoFavorito) { //función para actualizar el estado de favorito
    setDiscos(
      discos.map((disco) => {
        if (disco.id === id) {
          return { ...disco, favorito: nuevoEstadoFavorito };
        }
        return disco;
      })
    );
  }

  const filtroFavorito = verFavoritos   // filtro los discos segín el estado de "favorito"
    ? discos.filter((disco) => disco.favorito)
    : discos;

    //retorna el componente con la interfaz
  return (
    <>
      <div className="page-container col-12 col-md-8">
        <div className="caja text-center p-3 d-flex justify-content-center align-items-center flex-nowrap ">
          <img
            src={icono}
            alt="Imagen Izquierda"
            className="img-fluid me-5 d-none d-md-block rotar "
          />
          <h1> LA FONOTECA </h1>
          <img
            src={icono}
            alt="Imagen Derecha"
            className="img-fluid ms-5 d-none d-md-block rotar"
          />
        </div>
        { cargando ? ( 
        <div className="loading container text-center">
          <p>Cargando,¡no te marches!</p>
        </div>
        ) : ( 
      <> 
        <Formulario agregarDisco={agregarDisco} />

        <div className="row mt-3 ">
          <ul className="list-group mt-3">
            {filtroFavorito.length > 0 ? (
              filtroFavorito.map(
                ({ id, nombre, artista, genero, favorito }) => (
                  <Discos
                    key={id}
                    id={id}
                    disco={nombre}
                    artista={artista}
                    genero={genero}
                    favorito={favorito}
                    borrarDisco={borrarDisco}
                    editarDisco={editarDisco}
                    actualizarEstado={actualizarEstado}
                  />
                )
              )
            ) : (
              <li className="list-group-item">No hay discos para mostrar</li>
            )}
          </ul>
        </div>
     </>
      
      )}
        
      <div
        className="boton-ver-favoritos text-center"
        title={verFavoritos ? "Ver Todos" : "Ver Favoritos"}
      >
        <button
          className="btn btn-success"
          onClick={() => setVerFavoritos(!verFavoritos)}
        >
          {" "}
          {verFavoritos ? "Ver Todos" : "Ver Favoritos"}{" "}
        </button>
      </div>
      </div>
    </>
  );
}

export default App; //exporto el componente App como el componente principal
