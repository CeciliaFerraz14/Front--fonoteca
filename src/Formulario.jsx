import {useState} from "react"; 

function Formulario ({agregarDisco}){

    let [nombre,setNombre] = useState("");
    let[botonEditar,setBotonEditar] = useState("Agregar Disco")
  



    return <form className="d-flex gap-3 mb-3" onSubmit={evento=>{
        evento.preventDefault()
        setBotonEditar("Editando");

      
        if (nombre.trim() === "") {
            alert("Tiene que escribir un nuevo disco");
            return;
        }

        // fetch("http://localhost:4000/discos/nueva", {
        //     method: "POST",
        //     body: JSON.stringify({disco: nombre}),
        //     headers: {
        //         "Content-type" : "application/json"
        //     }
        // })
        // .then(respuesta => respuesta.json())
        // .then(({id}) =>{

         agregarDisco(nombre)
         setNombre("")

            
        // })





        
    }}>

              <input type="text" className="form-control" value={nombre} placeholder="Escriba aquí un nuevo disco" onChange={evento => setNombre(evento.target.value)} />

              <button type="submit"  className="btn btn-success"> Agregar Disco </button>

           </form>
}


export default Formulario