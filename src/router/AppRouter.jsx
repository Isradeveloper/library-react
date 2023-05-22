import {Routes, Route, Navigate} from 'react-router-dom'
import {Navegador} from '../components/Navegador'
import { useState, useEffect } from 'react';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export const AppRouter = () => {
  const [usuario, setUsuario] = useState(null);

  // Verificar si hay un usuario almacenado en el LocalStorage al cargar la página
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (userData) => {
    setUsuario(userData);
    localStorage.setItem('usuario', JSON.stringify(userData));
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <>
    <Navegador usuario={usuario} onLogOut={handleLogout}/>
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
        // Solo muestra la página de inicio de sesión si no hay un usuario almacenado
        // en el LocalStorage
        shouldNavigate={!usuario}
        />
      <Route
        path="/register"
        element={<Register onLogin={handleLogin} />}
        // Solo muestra la página de inicio de sesión si no hay un usuario almacenado
        // en el LocalStorage
        shouldNavigate={!usuario}
        />
      {(!usuario) ? <Route path='*' element={<Navigate to='/login' replace/>}></Route> : ''}

      {/* Rutas privadas */}
      {/* <Route
        path="/"
        element={
          // Solo muestra el componente protegido si hay un usuario almacenado en el LocalStorage
          user ? <PrivateComponent onLogout={handleLogout} /> : <Navigate to="/login" replace />
        }
      /> */}

  </Routes>
  </>
  )
}
