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
        element={(usuario) ? <Navigate to="/libros" replace /> : <Login onLogin={handleLogin}/>}
        />
      <Route
        path="/register"
        element={(usuario) ? <Navigate to="/libros" replace /> : <Register onLogin={handleLogin}/>}
        />

      <Route path='*' element={<Navigate to={"/login"}/>}/>

      {/* Rutas privadas */}

      <Route
        path="/"
        element={
          // Solo muestra el componente protegido si hay un usuario almacenado en el LocalStorage
          usuario ? '' : <Navigate to="/libros" replace />
        }
      />

  </Routes>
  </>
  )
}
