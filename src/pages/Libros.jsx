
import {GrFormAdd} from 'react-icons/gr'
import { useState, useRef, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { validarVacio, validarNoNumeros } from '../utils/validadores'
import Swal from 'sweetalert2'
import { agregarLibro, cargarLibros } from '../firebase'


export const Libros = ({usuario}) => {
  
  const [libros, setLibros] = useState([])
  const [cargandoLibros, setCargandoLibros] = useState(false)

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargandoLibros(true)
    const respuesta = await cargarLibros();
    setLibros(respuesta)
    setCargandoLibros(false)
  };

  const ref = useRef()

  const [show, setShow] = useState(false);
  
  const handleClose = () => {
    limpiarFormulario()
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const [titulo, setTitulo] = useState("")
  const [tituloValido, setTituloValido] = useState(false)
  const [descripción, setDescripcion] = useState("")
  const [descripcionValida, setDescripcionValida] = useState(false)  
  const [autor, setAutor] = useState("")
  const [autorValido, setAutorValido] = useState(false)
  const [year, setYear] = useState("")
  const [yearValido, setYearValido] = useState(false)
  const [portada, setPortada] = useState(null)
  const [subiendo, setSubiendo] = useState(false)

  const onChangeTitulo = (e) => {
    const value = e.target.value
    setTituloValido(validarVacio(e.target, value))
    setTitulo(value)
  }

  const onChangeDescripcion = (e) => {
    const value = e.target.value
    setDescripcionValida(validarVacio(e.target, value))
    setDescripcion(value)
  }

  const onChangeAutor = (e) => {
    const value = e.target.value
    setAutorValido(validarNoNumeros(e.target, value))
    setAutor(value)
  }

  const onChangeYear = (e) => {
    const value = e.target.value
    setYearValido(validarVacio(e.target, value))
    setYear(value)
  }

  const onChangePortada = (e) => {
    const file = (e.target.files[0])
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg']; 

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La portada debe pesar menos de 5Mb',
        confirmButtonText: 'Aceptar',
        didRender: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.remove('swal2-confirm');
        },
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      })
      e.target.value = ""
    }

    else if (!(allowedImageTypes.includes(file.type))) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La portada debe ser una imagen',
        confirmButtonText: 'Aceptar',
        didRender: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.remove('swal2-confirm');
        },
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      })
      e.target.value = ""
    } else {
      setPortada(file)
    }

    
  }

  const limpiarFormulario = () => {
    setTitulo("")
    setAutorValido(false)
    setDescripcion("")
    setDescripcionValida(false)
    setAutor("")
    setDescripcionValida(false)
    setYear("")
    setYearValido(false)
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    if (tituloValido && descripcionValida && autorValido && yearValido && portada) {
      setSubiendo(true)
      const respuesta = await agregarLibro(titulo, descripción, autor, year, portada)
      setSubiendo(false)

      if (respuesta.success == true) {
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: respuesta.msg,
          confirmButtonText: 'Aceptar',
          didRender: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.remove('swal2-confirm');
          },
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        }).then((respuesta) => {
          handleClose()
          cargarDatos()
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: respuesta.msg,
          confirmButtonText: 'Aceptar',
          didRender: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.remove('swal2-confirm');
          },
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El formulario tiene algunos errores',
        confirmButtonText: 'Aceptar',
        didRender: () => {
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.remove('swal2-confirm');
        },
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      })
    }
  }

  return (
    <>
      <div className="container-fluid mt-4">
    <h2 className="text-center">Libros disponibles</h2>
      {(cargandoLibros == false)
        ?
        <div className="col-12 mt-3 d-flex flex-wrap gap-2 px-2 justify-content-center">

        {libros.map((libro, index) => {
          return (
            <div className="col-12 col-md-4 col-lg-3 col-xxl-2 my-2" key={index}>
              <div className="card w-100">
                <img src={libro.Portada} className="card-img-top" alt="Portada" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{libro.Titulo}</h5>
                  <p className="card-text" style={{ maxHeight: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>{libro.Descripcion}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><b>Autor: </b>{libro.Autor}</li>
                  <li className="list-group-item"><b>Año: </b>{libro.Año}</li>
                  <li className="list-group-item"><b>Disponible: </b>{(libro.Disponibilidad) ? 'SI' : 'NO'}</li>
                </ul>
                <div className="card-body">
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a>
                </div>
              </div>
            </div>
          )
        })}

      </div>
      :
      <div className="col-12 d-flex justify-content-center mt-5">
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
      }
      
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar libro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(subiendo == false)
            ? <form onSubmit={onSubmit}>
            <div className="mb-3 col-12 mt-3">
              <label htmlFor="titulo">Título</label>
              <input type="text" onChange={onChangeTitulo} name="titulo" id="titulo" className="form-control" placeholder="Ingrese el título del libro"/>
              <div className="invalid-feedback">
                Debes ingresar un título válido
              </div>
            </div>

            <div className="mb-3 col-12 mt-3">
              <label htmlFor="descripcion">Descripción</label>
              <input type="text" onChange={onChangeDescripcion} name="descripcion" id="descripcion" className="form-control" placeholder="Ingrese la descripcion del libro"/>
              <div className="invalid-feedback">
                Debes ingresar una descripción válida
              </div>
            </div>

            <div className="mb-3 col-12 mt-3">
              <label htmlFor="titulo">Autor</label>
              <input type="text" onChange={onChangeAutor} name="autor" id="autor" className="form-control" placeholder="Ingrese el Autor del libro"/>
              <div className="invalid-feedback">
                Debes ingresar un autor válido
              </div>
            </div>

            <div className="mb-3 col-12 mt-3">
              <label htmlFor="titulo">Año de publicación</label>
              <input type="text" onChange={onChangeYear} name="year" id="year" className="form-control" placeholder="Ingrese el Año de publicación del libro"/>
              <div className="invalid-feedback">
                Debes ingresar un año de publicación válido
              </div>
            </div>
            
            <div className="mb-3 col-12 mt-3">
              <label htmlFor="titulo">Portada del libro</label>
              <input type="file" className='form-control' name="portada" id="portada" onChange={onChangePortada}/>
            </div>

            <button type="submit" className='d-none' ref={ref}></button>

          </form>
            :
            <>
              <div className="col-12 d-flex justify-content-center my-5">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              </>
          }
        </Modal.Body>
        <Modal.Footer>
          <>
            {(subiendo == false)
              ?
                <>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={(e) => {
                    ref.current.click()
                  }}>
                    Guardar
                  </Button>
                </>
              :
              ''
              
            }
          </>
        </Modal.Footer>
      </Modal>

    <div className="agregar-libro" onClick={handleShow}>
      <GrFormAdd size={30}/>
    </div>
    </>
  )
}
