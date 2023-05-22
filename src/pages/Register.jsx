import { useState } from "react"
import { validarCorreo, validarPassword, validarNoNumeros } from "../utils/validadores"
import {crearNuevoUsuario} from "../firebase"

export const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [emailValido, setEmailValido] = useState(false)
  const [passwordValida, setPasswordValida] = useState(false)
  const [nombresValidos, setNombresValidos] = useState(false)
  const [apellidosValidos, setApellidosValidos] = useState(false)

  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmailValido(validarCorreo(e.target, value))
    setEmail(value.toLowerCase())
  }

  const onChangePassword = (e) => {
    const value = e.target.value
    setPasswordValida(validarPassword(e.target, value))
    setPassword(value.toUpperCase())
  }

  const onChangeNombres = (e) => {
    const value = e.target.value
    setNombresValidos(validarNoNumeros(e.target, value))
    setNombres(value.toUpperCase())
  }

  const onChangeApellidos = (e) => {
    const value = e.target.value
    setApellidosValidos(validarNoNumeros(e.target, value))
    setApellidos(value.toUpperCase())
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (emailValido && passwordValida && nombresValidos && apellidosValidos) {
      crearNuevoUsuario(email, password, nombres, apellidos)
    } else {
      console.log('FORM INCORRECTO');
    }
  }

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center align-items-center flex-column">
        <div className="col-12 col-lg-6 mt-5">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center">Registrarse</h1>
            </div>
            <form className="col-12" onSubmit={onSubmit}>
              <div className="mb-3 col-12 mt-3">
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" onChange={onChangeEmail} name="email" id="email" className="form-control" placeholder="Ingrese su correo electrónico"/>
                <div className="invalid-feedback">
                  Debes ingresar un correo electrónico válido
                </div>
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" onChange={onChangePassword} id="password" className="form-control" placeholder="Ingrese su contraseña"/>
                <div className="invalid-feedback">
                  La contraseña debe tener más de 6 dígitos
                </div>
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="nombres">Nombres</label>
                <input type="text" name="nombres" onChange={onChangeNombres} id="nombres" className="form-control" placeholder="Ingrese sus nombres"/>
                <div className="invalid-feedback">
                  debes ingresar unos nombres válidos
                </div>
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" name="apellidos" onChange={onChangeApellidos} id="apellidos" className="form-control" placeholder="Ingrese sus apellidos"/>
                <div className="invalid-feedback">
                  debes ingresar unos apellidos válidos
                </div>
              </div>
              <button type="submit" className="col-12 btn btn-dark mt-3">Registrarse</button>
              <button type="button" className="col-12 btn btn-info mt-3">¿Ya tienes una cuenta?</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
