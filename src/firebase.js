import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'
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

export {fire, auth, crearNuevoUsuario, loguearUsuario}