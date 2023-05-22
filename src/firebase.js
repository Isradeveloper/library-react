import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWUpuQY0T-Wj2-PY-OFlzju3WJmHnvGmk",
  authDomain: "libraryapp-42aca.firebaseapp.com",
  projectId: "libraryapp-42aca",
  storageBucket: "libraryapp-42aca.appspot.com",
  messagingSenderId: "783218568812",
  appId: "1:783218568812:web:ac85f654e6a69fbb86f249"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth()
const database = fire.firestore()
const storage = fire.storage()
const ref = storage.ref()

const crearNuevoUsuario = async (email, password, nombres, apellidos) => {
  try {
    const credencial = await auth.createUserWithEmailAndPassword(email, password)
    // Signed in
    const usuario = credencial.user;

    await database.collection(`usuarios`).add({
      "Email": usuario.email,
      "UID": usuario.uid,
      "Nombres": nombres,
      "Apellidos": apellidos,
      "LibrosPrestados": []
    })

    return {
      "success": true,
      "msg": "Usuario creado correctamente!",
      "usuario": {
        "Email": usuario.email,
        "UID": usuario.uid,
        "Nombres": nombres,
        "Apellidos": apellidos,
        "LibrosPrestados": []
      }
    }

  } catch (error) {
    console.error({
      "errorCode": error.code,
      "errorMessage": error.message
    });
    return {
      "success": false,
      "msg": error.message,
    }
  }
}

const loguearUsuario = async(email, password) => {
  try {
    const credencial = await auth.signInWithEmailAndPassword(email, password)

    const usuario = credencial.user

    const query = await database.collection('usuarios').where('UID', '==', usuario.uid).get()

    let data

    query.forEach((doc)=> {
      data = doc.data()
    })

    return {
      "success": true,
      "msg": `BIENVENIDX ${data.Nombres} ${data.Apellidos}`,
      "usuario": data
    }

  } catch (error) {
    console.error({
      "errorCode": error.code,
      "errorMessage": error.message
    });
    return {
      "success": false,
      "msg": error.message,
    }
  }
}

const agregarLibro = async (titulo, descripcion, autor, year, portada) => {
  try {
    var mountainsRef = ref.child(uuidv4());
    const snapshot = await mountainsRef.put(portada)
    // Obtener el enlace de descarga del archivo cargado
    const url = await snapshot.ref.getDownloadURL();

    await database.collection('libros').add({
      "Titulo": titulo,
      "Descripcion": descripcion,
      "Autor": autor,
      "Año": year,
      "Disponibilidad": true,
      "Portada": url
    })
    return {
      "success": true,
      "msg": "Libro creado correctamente"
    }
  } catch (error) {
    console.error({
      "errorCode": error.code,
      "errorMessage": error.message
    });
    return {
      "success": false,
      "msg": error.message,
    }
  }
}

const cargarLibros = async() => {
  try {
    const query = await database.collection('libros').where('Titulo', '!=', '').get()
    let libros = []
    query.forEach((doc) => {
      libros = [...libros, doc.data()]
    })

    return libros

  } catch (error) {
    console.error({
      "errorCode": error.code,
      "errorMessage": error.message
    });
    return {
      "success": false,
      "msg": error.message,
    }
  }
}

export {fire, auth, crearNuevoUsuario, loguearUsuario, agregarLibro, cargarLibros}