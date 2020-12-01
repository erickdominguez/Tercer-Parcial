import {db} from './firebase'
import './App.css';
import {useState} from 'react'
import {useEffect} from 'react'

function App() {
  const [Libros, setLibros] = useState([])
  const [Autor, setAutor] = useState([])
  const [Titulo, setTitulo] = useState([])
  const [Clasificacion, setClasificacion] = useState([])
  const [Editorial, setEditorial] = useState([])
  const [idLibro, setidLibro] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const getLibros = async () => {
    const data = await db.collection('Libros').get()
    const arrLibros = data.docs.map(doc =>({id: doc.id, ...doc.data()}))
    setLibros(arrLibros)
    console.log(Libros)
  }
  useEffect(() => {
    getLibros()
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const agregarLibro = async (e) => {
    e.preventDefault()
    
    const firebaseLibro = await db.collection('Libros').add({
      AUTOR : Autor,
      TITULO : Titulo,
      CLASIFICACION: Clasificacion,
      EDITORIAL : Editorial,
      IDLIBRO : idLibro,

    })
    const nuevoLibroObject = {
      AUTOR : Autor,
      TITULO : Titulo,
      CLASIFICACION: Clasificacion,
      EDITORIAL : Editorial,
      IDLIBRO : idLibro,
    }


    setLibros([...Libros, {id: firebaseLibro.id, ...nuevoLibroObject } ])
    setAutor('')
    setTitulo('')
    setClasificacion('')
    setEditorial('')
    setidLibro('')
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTitulo(item.TITULO)
    setAutor(item.AUTOR)
    setClasificacion(item.CLASIFICACION)
    setEditorial(item.EDITORIAL)
    setidLibro(item.IDLIBRO)
    setId(item.id)

  }

  const editarLibro = async (e) => {
    e.preventDefault()
    const firebaseLibro = await db.collection('Libros').doc(id).update({
      AUTOR : Autor,
      TITULO : Titulo,
      CLASIFICACION: Clasificacion,
      EDITORIAL : Editorial,
      IDLIBRO : idLibro,

    })

    const arregloEditado = Libros.map(item =>
      
        item.id === id ? {id: item.id,AUTOR:Autor,TITULO:Titulo,CLASIFICACION: Clasificacion,EDITORIAL : Editorial,IDLIBRO : idLibro, } : item
      )

      setLibros(arregloEditado)
      setModoEdicion(false)
      setId('')
  }

  const eliminarLibro = async (item) => {
    try{
      await db.collection('Libros').doc(item.id).delete()
      const filtro = Libros.filter(item => item.id !==id)
      setLibros(filtro)
      getLibros()
    }
    catch(error){
      console.log(error)
    }
    
  }

  return (
    
    
    <div>
      <h1 style={{backgroundColor:"#DC143C", color: "	whitesmoke"}} className="pb-3 font-weight-bold text-center">Libros Alquilados</h1>
      <div className="container text-center container col-md-8 col-md-offset-4 " >
      <div style={{backgroundColor: "white",color: "#DC143C"}} className=" mb-3 pb-3 container col-md-10 col-md-offset-2 border rounded">
        <form className="well form-horizontal" onSubmit={modoEdicion ? editarLibro : agregarLibro}>
          <div className="form-group  input-group-sm font-weight-bold font-italic">
            <p>TITULO</p>
            <input type ="text" className="form-control text-center   " value={Titulo} onChange={e => setTitulo(e.target.value)} placeholder="Titulo" required></input>
            <p>AUTOR</p>
            <input type ="text" className="form-control text-center " value={Autor} onChange={e => setAutor(e.target.value)} placeholder="Autor" required></input>
            <p>CLASIFICACION</p>
            <select className="form-control text-center " value={Clasificacion} onChange={e => setClasificacion(e.target.value)} placeholder="Clasificacion" required>
              <option value="18+">18+</option>
              <option value="Infantil">Infantil</option>
              <option value="Adolescentes">Adolescentes</option>
            </select>
            <p>EDITORIAL</p>
            <input type ="text" className="form-control text-center " value={Editorial} onChange={e => setEditorial(e.target.value)} placeholder="Editorial" required></input>
            <p>ID</p>
            <input type ="text" className="form-control text-center " value={idLibro} onChange={e => setidLibro(e.target.value)} placeholder="ID" required></input>
          </div>
        
          <div className="col text-center">
            
          <button type="submit" className="btn btn-success btn-lg btn-block ">OK</button>
          
          </div>
        </form>
      </div>
      
      <ul className="list-group" style={{color: "#DC143C"}}>
        {
          Libros.map(item => (
          <li className="list-group-item" key={item.id}>
                <h3 className="font-weight-bold font-italic">{item.TITULO}</h3><hr/>
                <p className="font-weight-bold">Autor:</p><p style={{color: "black"}}>{item.AUTOR}</p>
                <p className="font-weight-bold">Clasificacion:</p><p style={{color: "black"}}>{item.CLASIFICACION}</p>
                <p className="font-weight-bold">Editorial: </p><p style={{color: "black"}}>{item.EDITORIAL}</p>
                <p className="font-weight-bold">ID: </p><p style={{color: "black"}}>{item.IDLIBRO}</p>
                
                <div className="col text-center">
                  <button className="btn btn-danger btn-sm mr-2 " onClick={() => eliminarLibro(item)}>Entregado</button>
                  <button className="btn btn-dark btn-sm " onClick={() => activarEdicion(item)}>Editar</button>
                </div>
                

          </li>
          ))
        } 
      </ul>
    </div>
    </div>
  );
}

export default App;
