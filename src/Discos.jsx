

import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faStar, faPenToSquare, faFloppyDisk} from "@fortawesome/free-solid-svg-icons"


function Discos({id,disco,editarDisco,borrarDisco,estadoDisco}){
    let [editando,setEditando] = useState(false)
    let [textoTemporal,setTextoTemporal] = useState(disco)


    return (<div className="list-group-item d-flex justify-content-between align-items-center">
    {!editando ? (
        <h3 className="mb-0">{disco}</h3>
    ) : (
        <input
            type="text"
            className="form-control me-3"
            value={textoTemporal}
            onChange={(evento) => setTextoTemporal(evento.target.value)}
        />
    )}

          <div className="ms-auto btn-group" >
                <button  className=" btn btn-success me-3" title={editando ? "Guardar" : "Editar"} 
                  onClick={ () => {
                        if(editando){
                                if(textoTemporal.trim() != "" && 
                                textoTemporal.trim() != disco){
                                        return fetch(`http://localhost:4000/discos/editar/${id}`, {
                                                method : "PUT",
                                                body : JSON.stringify({ disco : textoTemporal.trim() }),
                                                headers : {
                                                        "Content-type" : "application/json"
                                                }
                                        })
                                        .then(respuesta => respuesta.json())
                                        .then(({error,resultado}) => {
                                                if(!error && resultado == "ok"){
                                                        editarDisco(id,textoTemporal.trim())
                                                        setTextoTemporal(textoTemporal.trim())
                                                        setEditando(false)
                                                     
                                                }else{
                                                        console.log("..error a usuario")
                                                }
                                                
                                        });
                                }else{
                                setTextoTemporal(disco)
                                setEditando(false)
                               
                                }
                               
                                
                                

                        }else{
                           setEditando(true)
                                
                        }
                  } }
                >
                        { editando ? <FontAwesomeIcon icon={faFloppyDisk}/> : <FontAwesomeIcon icon={faPenToSquare}/> }
                  </button>
                </div>
                <button className="btn btn-danger" title="Borrar"
                        onClick={ () => {
                                // fetch("http://localhost:4000/discos/borrar/" + id, {
                                //         method : "DELETE"
                                // })
                                // .then(respuesta => respuesta.json())
                                // .then(({error,resultado}) => {
                                //         if(!error && resultado == "ok"){
                                                return borrarDisco(id)
                                        // }
                                        // console.log("..error a usuario")
                                // })
                        } }
                >
                        <FontAwesomeIcon icon={faTrash} />
                        
                </button>
                
            </div>
           
            );
                    }

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   // return <li className="list-group-item">{nombre}</li>



//exporto la función y la importo en el App.jsx
export default Discos