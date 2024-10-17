import {useState} from "react"; 

function Formulario ({agregarDisco}){

    let [nombre,setNombre] = useState("");
    let[botonEditar,setBotonEditar] = useState("Agregar Disco")
    let[artista,setArtista] = useState("");
    let[genero,setGenero] = useState ("");
  



    return <form className="d-flex gap-3 mb-3" onSubmit={evento=>{
        evento.preventDefault()
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

        // fetch("http://localhost:4000/discos/nueva", {
        //     method: "POST",
        //     body: JSON.stringify({disco: nombre}),
        //     headers: {
        //         "Content-type" : "application/json"
        //     }
        // })
        // .then(respuesta => respuesta.json())
        // .then(({id}) =>{

         agregarDisco(nombre,artista,genero)
         setNombre("")
         setArtista("")
         setGenero("")

        

            
        // })





        
    }}>

              <input type="text" className="form-control" value={nombre} placeholder="Escriba aquí un nuevo disco" onChange={evento => setNombre(evento.target.value)} />
              <input type="text" className="form-control" value={artista} placeholder="Artista" onChange={evento => setArtista(evento.target.value)} />
              <input type="text" className="form-control" value={genero} placeholder="Género musical" onChange={evento => setGenero(evento.target.value)} />

              <button type="submit"  className="btn btn-success"> Agregar Disco </button>

           </form>
}


export default Formulario