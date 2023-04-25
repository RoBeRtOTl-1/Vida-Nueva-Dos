import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query } from "firebase/firestore";
import { DatoBD_Dom_Filtrado, insertarDom } from "../Domicilio/Dom_CRUD";


export async function insertarUSU(datos) {
    try {
        const newUsuario = await addDoc(collection(db, 'USUARIOS'), {
            NOMBRE: datos.NOMBRE,
            AP_MATERNO: datos.AP_MATERNO,
            AP_PATERNO: datos.AP_PATERNO,
            CEDULA: datos.CEDULA,
            CLAVE: datos.CLAVE,
            EMAIL: datos.EMAIL,
            ID_DOMICILIO: datos.ID_DOMICILIO,
            ID_ESPECIALIDAD: datos.ID_ESPECIALIDAD,
            ID_SEXO: datos.ID_SEXO,
            ID_TDU: datos.ID_TDU,
            NACIMIENTO: datos.NACIMIENTO,
            TELEFONO: datos.TELEFONO,
            ID_ESTADOS: 1
        });
        alert("NUEVA USUARIO INSERTADADO")
        return newUsuario.id
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }
}

export async function DatoDeLaBD() {
    const querySnapshot = await getDocs(collection(db, "USUARIOS"));
    const datos = [];
    querySnapshot.forEach(async (doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
        const domi = await DatoBD_Dom_Filtrado(doc.data().ID_DOMICILIO)
        Object.assign(list_Data, domi)

        // Object.keys(domi[0]).forEach((nombre)=>{
        //     list_Data[`${nombre}`] = domi[0][nombre]
        // })
    });
    return datos;
}


export async function DatoDeLaBDFiltrado(estado) {
    const datos = [];

    const querySnapshot = await getDocs(query(collection(db, "USUARIOS"), where("ID_ESPECIALIDAD", "==", estado)));
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}


export async function actualizarUsuario(id, datos) {
    console.log(id+" "+datos)
    // Add a new document in collection "cities"
    await setDoc(doc(db, "USUARIOS", id), {
        NOMBRE: datos.NOMBRE,
        AP_MATERNO: datos.AP_MATERNO,
        AP_PATERNO: datos.AP_PATERNO,
        CEDULA: datos.CEDULA,
        CLAVE: datos.CLAVE,
        EMAIL: datos.EMAIL,
        ID_DOMICILIO: datos.ID_DOMICILIO,
        ID_ESPECIALIDAD: datos.ID_ESPECIALIDAD,
        ID_SEXO: datos.ID_SEXO,
        ID_TDU: datos.ID_TDU,
        NACIMIENTO: datos.NACIMIENTO,
        TELEFONO: datos.TELEFONO,
        ID_ESTADOS: parseInt(datos.ID_ESTADOS)
    });
    alert("USUARIO ACTUALIZADO")
}





