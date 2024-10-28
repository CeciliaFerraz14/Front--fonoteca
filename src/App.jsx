import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./estilos.css";
import icono from "./archivos/icono.png";

import Discos from "./Discos";
import Formulario from "./Formulario";

function App() {
  let [discos, setDiscos] = useState([]);
  let [verFavoritos, setVerFavoritos] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/discos")
      .then((respuesta) => respuesta.json())
      .then((discos) => setDiscos(discos));
  }, []);

  function agregarDisco(disco, artista, genero) {
    fetch("http://localhost:4000/discos/nueva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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


  function borrarDisco(id) {
    fetch(`http://localhost:4000/discos/borrar/${id}`, {
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

  function editarDisco(id, nuevoNombre, nuevoArtista, nuevoGenero) {
    fetch(`http://localhost:4000/discos/editar/${id}`, {
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

  function actualizarEstado(id, nuevoEstadoFavorito) {
    setDiscos(
      discos.map((disco) => {
        if (disco.id === id) {
          return { ...disco, favorito: nuevoEstadoFavorito };
        }
        return disco;
      })
    );
  }

  const filtroFavorito = verFavoritos
    ? discos.filter((disco) => disco.favorito)
    : discos;

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
      </div>

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
    </>
  );
}

export default App;
