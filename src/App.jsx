import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './estilos.css';
import icono from './archivos/icono.png';



import Discos from './Discos'; 
import Formulario from './Formulario';



function App() {
  let[discos,setDiscos] = useState([]);
  let[verFavoritos, setVerFavoritos] = useState(false);

  useEffect(()=>{
    fetch("http://localhost:4000/discos")
    .then(respuesta => respuesta.json())
    .then(discos=>setDiscos(discos))
  },[]);

  function agregarDisco(disco,artista,genero){
    fetch("http://localhost:4000/discos/nueva", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({disco,artista,genero}),
  })
    .then((respuesta) => respuesta.json())
    .then(({ id }) => {
      setDiscos([...discos, { id, nombre: disco,artista,genero, favorito: false }]);
    })
    .catch(error => console.error("Error al agregar disco:", error))
}
    //let id = discos.length > 0? discos[discos.length - 1].id +1 : 1;
   // setDiscos ([...discos,disco])
  

  function borrarDisco(id){
    fetch(`http://localhost:4000/discos/borrar/${id}`, {
    method: "DELETE",
  })
    .then((respuesta) => respuesta.json())
    .then(({ resultado }) => {
      if (resultado === "ok") {
        setDiscos(discos.filter((disco) => disco.id !== id));
      }
    }) .catch((error) => console.error("Error al borrar disco:", error));
  };

  function editarDisco(id, nuevoNombre, nuevoArista, nuevoGenero) {
    setDiscos(discos.map(disco => disco.id == id ? {...disco, nombre: nuevoNombre, artista:nuevoArista, genero:nuevoGenero}: disco));
  };

  function actualizarEstado(id,nuevoEstadoFavorito){
  setDiscos(discos.map(disco =>{
    if(disco.id === id){
      return{ ...disco,favorito : nuevoEstadoFavorito};
      
    }
    return disco;
  }))
}

  

  

    const filtroFavorito = verFavoritos ? discos.filter(disco => disco.favorito): discos;


 

  return (
    <>
    <div className="page-container ">
    
      <div className="caja text-center p-3 d-flex justify-content-center align-items-center flex-nowrap">
          <img src={icono} alt="Imagen Izquierda" className="img-fluid me-5 d-none d-md-block rotar " /> 
          <h1> LA FONOTECA </h1>
          <img src={icono} alt="Imagen Derecha" className="img-fluid ms-5 d-none d-md-block rotar" />

          </div>

      

    <Formulario agregarDisco={agregarDisco}/>

    <ul className="list-group mt-3">
      {filtroFavorito.length > 0 ? (
            filtroFavorito.map(({ id, nombre,artista,genero, favorito }) => (
              <Discos
                key={id}
                id={id}
                disco={nombre}
                artista={artista}
                genero ={genero}
                favorito={favorito}
                borrarDisco={borrarDisco}
                editarDisco={editarDisco}
                actualizarEstado={actualizarEstado}
              />
            ))
          ) : (
            <li className='list-group-item'>No hay discos para mostrar</li>
          )}
        </ul>
      </div>
      
      <div className='boton-ver-favoritos text-center' title={verFavoritos? "Ver Todos" : "Ver Favoritos"} >
        <button className="btn btn-success" onClick={()=> setVerFavoritos (!verFavoritos) }
        > {verFavoritos ? "Ver Todos" : "Ver Favoritos"} </button>
      </div>

    </>
  );
}
  


export default App
