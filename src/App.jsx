import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'; // Para importar los estilos de Bootstrap
import './estilos.css';
import icono from './archivos/icono.png';



import Discos from './Discos'; //Importo la función Discos
import Formulario from './Formulario';



function App() {
  let[discos,setDiscos] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/discos")
    .then(respuesta => respuesta.json())
    .then(discos=>{
      setDiscos(discos)
    })
  },[]);

  function agregarDisco(disco){
    fetch("http://localhost:4000/discos/nueva", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({disco}),
  })
    .then((respuesta) => respuesta.json())
    .then(({ id }) => {
      setDiscos([...discos, { id, nombre: disco }]);
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

  function editarDisco(id, nuevoNombre) {
    setDiscos(discos.map(disco => disco.id == id ? { id, nombre: nuevoNombre } : disco));
  }

    


 

  return (
    <>
    <div className="page-container ">
    
      <div className="caja text-center p-3 d-flex justify-content-center align-items-center flex-nowrap">
          <img src={icono} alt="Imagen Izquierda" className="img-fluid me-5 d-none d-md-block " /> 
          <h1> LA FONOTECA </h1>
          <img src={icono} alt="Imagen Derecha" className="img-fluid ms-5 d-none d-md-block " />

          </div>

    <Formulario agregarDisco={agregarDisco}/>
   
    <ul className="list-group mt-3">
      {discos.length > 0 ? (discos.map(({id,nombre}) => <Discos key={id}
                                                        id={id} 
                                                         disco={nombre}
                                                         borrarDisco={ borrarDisco}
                                                         editarDisco={editarDisco}/>
                                                         )):
                                                         (<li className='list-group-item'>No hay discos para mostar</li>)}
    </ul>
    </div>
     
    </>
  );
  }
  


export default App
