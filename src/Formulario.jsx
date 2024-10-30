import { useState } from "react"; //importo hook de react

function Formulario({ agregarDisco }) { //componente de formulario para agregar disco
  //declaración de estados para guardar el nombre del dico,artista y el género
  let [nombre, setNombre] = useState("");
  let [botonEditar, setBotonEditar] = useState("Agregar Disco"); //texto del botón
  let [artista, setArtista] = useState("");
  let [genero, setGenero] = useState("");
 

  return (
    <form
      className="d-flex gap-3 mb-3"
      onSubmit={(evento) => {
        evento.preventDefault();
        setBotonEditar("Editando");

        if (nombre.trim() === "") {
          alert("Tiene que escribir un nuevo disco");
          return;
        }

        if (artista.trim() === "") {
          alert("Tiene que indicar el artista");
          return;
        }

        if (genero.trim() === "") {
          alert("Tiene que indicar de qué género musical es el disco");
          return;
        }


        agregarDisco(nombre, artista, genero);/*llama a la función con los valores ingresados*/
       /*restablece los valores de los campos*/
        setNombre("");
        setArtista("");
        setGenero("");

       
      }}
    >
      
       {/* Campo de entrada para el nombre del disco */}
      <input
        type="text"
        className="form-control"
        value={nombre}
        placeholder="Escriba aquí un nuevo disco"
        onChange={(evento) => setNombre(evento.target.value)}
      />
       {/* Campo de entrada para el nombre del artista */}
      <input
        type="text"
        className="form-control"
        value={artista}
        placeholder="Artista"
        onChange={(evento) => setArtista(evento.target.value)}
      />
       {/* Campo de entrada para el género musical */}
      <input
        list="generos"
        className="form-control"
        value={genero}
        onChange={(evento) => setGenero(evento.target.value)}
        placeholder="Selecciona o escribe un género musical"
      />
       {/* lista de sugerencias para el usuario */}
      <datalist id="generos">
        <option value="Blues" />
        <option value="Clásica" />
        <option value="Country" />
        <option value="Electrónica" />
        <option value="Funk" />
        <option value="Hip Hop" />
        <option value="Indie" />
        <option value="Jazz" />
        <option value="Metal" />
        <option value="Pop" />
        <option value="Rap" />
        <option value="Reggae" />
        <option value="Rock" />
        <option value="Rock and Roll" />
        <option value="Ska" />
      </datalist>

       {/* Botón para enviar todo el formulario */}
      <button type="submit" className="btn btn-success">
        {" "}
        Agregar Disco{" "}
      </button>
    </form>
  );
}

export default Formulario;
