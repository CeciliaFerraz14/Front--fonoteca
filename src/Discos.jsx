import { useState } from "react"; //importo hook de react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //importo los iconos de fontawesome.com  que uso para algunos  botones
import {
  faTrash,
  faPenToSquare,
  faFloppyDisk,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Discos({ //defino el componente DISCOS con las props necesarias
  id,
  disco,
  artista,
  genero,
  favorito,
  editarDisco,
  borrarDisco,
  actualizarEstado,
}) { 
  //defino los estados para manejar la edición, y los textos temporales
  let [editando, setEditando] = useState(false);
  let [textoTemporal, setTextoTemporal] = useState(disco);
  let [textoTemporalArtista, setTextoTemporalArtista] = useState(artista);
  let [textoTemporalGenero, setTextoTemporalGenero] = useState(genero);

  return ( //retorno de la estructura donde se va a editar, guardar,borrar y añadir a favoritos
    <div className="list-group-item d-flex justify-content-between align-items-center">
      {!editando ? (
        <div>
          <h3 className="mb-0">{disco}</h3>
          <p>
            <strong>Artista:</strong> {artista}
          </p>
          <p>
            <strong>Género:</strong> {genero}
          </p>
        </div>
      ) : (
        <div className="w-100">
          <input
            type="text"
            className="form-control me-3 mb-2"
            value={textoTemporal}
            placeholder="Nombre del Disco"
            onChange={(evento) => setTextoTemporal(evento.target.value)}
          />

          <input
            type="text"
            className="form-control me-3 mb-2"
            value={textoTemporalArtista}
            placeholder="Nombre del Artista"
            onChange={(evento) => setTextoTemporalArtista(evento.target.value)}
          />

          <input
            type="text"
            className="form-control me-3 mb-2"
            value={textoTemporalGenero}
            placeholder="Género Musical"
            onChange={(evento) => setTextoTemporalGenero(evento.target.value)}
          />
        </div>
      )}

      <div className="ms-auto btn-group">
        <button
          className=" btn btn-success me-3"
          title={editando ? "Guardar" : "Editar"}
          onClick={() => {
            if (editando) {
              if (
                (textoTemporal.trim() != "" &&
                  textoTemporalArtista.trim() != "" &&
                  textoTemporalGenero.trim() != "" &&
                  textoTemporal.trim() != disco) ||
                textoTemporalArtista.trim() != artista ||
                textoTemporalGenero.trim() != genero
              ) {
                return fetch(`https://back-fonoteca.onrender.com/discos/editar/${id}`, {
                  method: "PUT",
                  body: JSON.stringify({
                    disco: textoTemporal.trim(),
                    artista: textoTemporalArtista.trim(),
                    genero: textoTemporalGenero.trim(),
                  }),
                  headers: {
                    "Content-type": "application/json",
                  },
                })
                  .then((respuesta) => respuesta.json())
                  .then(({ error, resultado }) => {
                    if (!error && resultado == "ok") {
                      editarDisco(
                        id,
                        textoTemporal.trim(),
                        textoTemporalArtista.trim(),
                        textoTemporalGenero.trim()
                      );
                      setTextoTemporal(textoTemporal.trim());
                      setTextoTemporalArtista(textoTemporalArtista.trim());
                      setTextoTemporalGenero(textoTemporalGenero.trim());

                      setEditando(false);
                    } else {
                      console.log("..error a usuario");
                    }
                  });
              } else {
                setTextoTemporal(disco);
                setTextoTemporalArtista(artista);
                setTextoTemporalGenero(genero);
                setEditando(false);
              }
            } else {
              setEditando(true);
            }
          }}
        >
          {editando ? (
            <FontAwesomeIcon icon={faFloppyDisk} />
          ) : (
            <FontAwesomeIcon icon={faPenToSquare} />
          )}
        </button>
      </div>

      <button
        className={`btn ${
          favorito ? "btn-warning" : "btn-outline-warning"
        } me-3`}
        title={favorito ? "Quitar de Favoritos" : "Añadir a Favoritos"}
        onClick={() => {
          const nuevoEstadoFavorito = !favorito;
          fetch(`https://back-fonoteca.onrender.com/discos/actualizar/estado/${id}`, {
            method: "PUT",
            body: JSON.stringify({ favorito: nuevoEstadoFavorito }), 
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((respuesta) => respuesta.json())
            .then(({ error, resultado }) => {
              if (!error && resultado === "ok") {
                actualizarEstado(id, nuevoEstadoFavorito);
              } else {
                console.log("..error al actualizar el estado");
              }
            })
            .catch((error) => {
              console.error("error en el servidor:", error);
            });
        }}
      >
        <FontAwesomeIcon icon={favorito ? faStar : faStarHalfStroke} />
      </button>

      <button
        className="btn btn-danger"
        title="Borrar"
        onClick={() => {
          
          return borrarDisco(id);
          
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

//exporto el componente Discos
export default Discos;
