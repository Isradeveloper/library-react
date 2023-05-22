import { useState } from "react"
import { validarCorreo, validarPassword } from "../utils/validadores"
import {loguearUsuario} from '../firebase'

export const Login = ({onLogin}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailValido, setEmailValido] = useState(false)
  const [passwordValida, setPasswordValida] = useState(false)

  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmailValido(validarCorreo(e.target, value))
    setEmail(value)
  }

  const onChangePassword = (e) => {
    const value = e.target.value
    setPasswordValida(validarPassword(e.target, value))
    setPassword(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (emailValido && passwordValida) {
      loguearUsuario(email, password)
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
              <h1 className="text-center">Iniciar sesión</h1>
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
              <button type="submit" className="col-12 btn btn-dark mt-3">Acceder</button>
              <button type="button" className="col-12 btn btn-info mt-3">¿No tienes cuenta?</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
